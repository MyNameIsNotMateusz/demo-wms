import { FormCard, FormLayout } from "../../../components/layout"
import { useState, useEffect } from "react";
import { FormActionsWrapper, FormCardWrapper, FormRow, FormTableWrapper } from "../../../components/ui/form/FormBase.styles";
import { FormSelect, ReadOnlyField, SubmitButton, TableActionButton } from "../../../components/ui";
import { updateFormData } from "../../../utils/forms/updateFormData";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../../auth/AuthProvider";
import { setShipments, setEditableShipmentData, resetShipmentsState, updateEditableShipmentRow, addEditableShipmentRow, removeEditableShipmentRows, resetEditableShipmentsState } from "./wzDocumentsFormSlice";
import { fetchShipments } from "./api/shipmentsApi";
import { selectEditableShipments, selectShipments } from "./wzDocumentsSelectors";
import { ShipmentsTable } from "./ShipmentsTable";
import { groupPalletsByMaterial } from "./utils/groupPalletsByMaterial";
import { ShipmentSummaryTable } from "./ShipmentSummaryTable";
import { handleError, handleSuccess } from "../../../utils/alerts";
import { generateWzPdf } from "./pdf/generateWzPdf";
import { CubeIcon } from "@heroicons/react/24/solid";
import logo from "../../../assets/icons/logo.png";
import { EditableShipmentTable } from "./EditableShipmentTable";
import { fetchAvailablePallets } from "./api/fetchAvailablePallets";
import { v4 as uuidv4 } from "uuid";
import { buildShipmentEditPayload } from "./utils/buildShipmentEditPayload";
import { validateDuplicatePallets } from "./utils/validateDuplicatePallets";
import { updateShipment } from "./api/updateShipment";

export const WzDocumentsForm = ({ onClose }) => {
    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        contractor_tax_id: "",
    });

    const displayedShipments = useSelector(selectShipments);
    const displayedEditableShipments = useSelector(selectEditableShipments);

    const [isLoading, setIsLoading] = useState(false);
    const [selectedShipments, setSelectedShipments] = useState(
        {},
    );
    const [selectedEditableShipments, setSelectedEditableShipments] = useState(
        {},
    );
    const [selectedShipmentData, setSelectedShipmentData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [availablePallets, setAvailablePallets] = useState([]);
    const [editedValues, setEditedValues] = useState({});

    const { contractors } = useSelector((state) => state.contractors);

    const { shipments, editableShipmentData } = useSelector((state) => state.wzDocumentsForm);

    useEffect(() => {
        dispatch(resetShipmentsState());
    }, []);

    useEffect(() => {
        if (!formData.contractor_tax_id) return;

        loadShipments();
    }, [formData.contractor_tax_id]);

    useEffect(() => {
        if (!Object.keys(selectedShipments).length) {
            setSelectedShipmentData(null);
            setIsEditMode(false);
            return;
        }

        const shipmentDocumentNumber = Object.keys(selectedShipments)[0];

        const shipment = shipments.find(
            ({ document_number }) =>
                document_number === shipmentDocumentNumber
        );

        if (!shipment) {
            setSelectedShipmentData(null);
            return;
        }

        const groupedPallets = groupPalletsByMaterial(shipment.pallets);

        const contractor = shipment.contractor;

        setSelectedShipmentData({
            document_number: shipment.document_number,
            created_at: shipment.created_at,

            contractor_name: contractor?.name || "",

            tax_id: contractor?.tax_id || "",

            address:
                contractor?.address && contractor?.country
                    ? `${contractor.address}, ${contractor.country}`
                    : contractor?.address || contractor?.country || "",

            pallets: groupedPallets,
        });
    }, [selectedShipments, shipments]);

    useEffect(() => {
        const documentNumber = Object.keys(selectedShipments)[0];

        dispatch(setEditableShipmentData(documentNumber));
    }, [selectedShipments]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pallets = await fetchAvailablePallets({
                    shipments,
                    selectedShipments,
                    accessToken,
                });

                setAvailablePallets(pallets);
            } catch (error) {
                handleError(error.message);
            }
        };

        if (Object.keys(selectedShipments).length) {
            fetchData();
        }
    }, [selectedShipments]);

    useEffect(() => {
        setSelectedShipments({});
    }, [formData.contractor_tax_id]);

    const loadShipments = async () => {
        try {
            const data = await fetchShipments({
                contractorTaxId: formData.contractor_tax_id,
                accessToken,
            });

            dispatch(setShipments(data));
        } catch (e) {
            console.error(e);
        }
    };

    const handleEnableEditMode = () => {
        const selectedDocument = Object.keys(selectedShipments).length;

        if (!selectedDocument) {
            handleError("No document selected");
            return;
        }

        setIsEditMode(true);
    };

    const handlePrintDocument = () => {
        if (!Object.keys(selectedShipments).length) {
            handleError("No shipment selected to print.");
            return;
        }

        generateWzPdf({
            selectedShipmentData,
            logo: logo,
        });
    };

    const handlePalletChange = (palletId, rowId) => {
        const selected = availablePallets.find(
            ({ pallet_id }) => pallet_id === palletId
        );

        if (!selected) return;

        const updatedRow = {
            rowId,
            pallet: selected.pallet_id,
            material_code: selected.material_code,
            material_name: selected.material_name,
            material_type: selected.material_type,
            quantity: parseInt(selected.quantity, 10),
        };

        dispatch(updateEditableShipmentRow(updatedRow));
    };

    const handleAddShipmentRow = () => {
        const uniqueId = uuidv4();

        const newRow = {
            id: uniqueId,
            pallet: "",
            material_code: "",
            material_name: "",
            material_type: "",
            quantity: 0,
            status: "SEND",
        };

        dispatch(addEditableShipmentRow(newRow));
    };

    const handleRemoveShipmentRows = () => {
        const idsToRemove = Object.keys(
            selectedEditableShipments
        );

        if (idsToRemove.length === 0) {
            handleError("No row selected.");
            return;
        }

        if (idsToRemove.length === 1) {
            const onlyId = idsToRemove[0];

            const indexToRemove =
                displayedEditableShipments.findIndex(
                    (row) =>
                        (row.id || row.pallet) === onlyId
                );

            const nextItem =
                displayedEditableShipments[indexToRemove + 1] &&
                    !idsToRemove.includes(
                        displayedEditableShipments[indexToRemove + 1].id ||
                        displayedEditableShipments[indexToRemove + 1].pallet
                    )
                    ? displayedEditableShipments[indexToRemove + 1]
                    : displayedEditableShipments[indexToRemove - 1] &&
                        !idsToRemove.includes(
                            displayedEditableShipments[indexToRemove - 1].id ||
                            displayedEditableShipments[indexToRemove - 1].pallet
                        )
                        ? displayedEditableShipments[indexToRemove - 1]
                        : null;

            dispatch(removeEditableShipmentRows(idsToRemove));

            setSelectedEditableShipments(
                nextItem
                    ? {
                        [nextItem.id || nextItem.pallet]:
                            true,
                    }
                    : {}
            );

            return;
        }

        dispatch(removeEditableShipmentRows(idsToRemove));

        setSelectedEditableShipments({});
    };

    const handleDisableEditMode = () => {
        setIsEditMode(false);

        dispatch(
            resetEditableShipmentsState(
                Object.keys(selectedShipments)[0]
            )
        );
    };

    const handleSaveChanges = async () => {
        try {
            const selectedDocument =
                Object.keys(selectedShipments)[0];

            const selected = shipments.find(
                (doc) =>
                    doc.document_number === selectedDocument
            );

            if (!selected) return;

            const originalPallets = selected.pallets;

            const currentPallets =
                editableShipmentData;

            const payload =
                buildShipmentEditPayload({
                    originalPallets,
                    currentPallets,
                });

            const {
                items_to_delete,
                items_to_update,
                items_to_add,
            } = payload;

            const isValid =
                validateDuplicatePallets(
                    items_to_add
                );

            if (!isValid) {
                handleError(
                    "Duplicate pallets are not allowed."
                );

                return;
            }

            if (
                items_to_delete.length === 0 &&
                items_to_update.length === 0 &&
                items_to_add.length === 0
            ) {
                handleError("No changes made.");

                return;
            }

            await updateShipment({
                selectedDocument,
                payload,
                accessToken,
            });

            handleSuccess(
                "Shipment updated successfully."
            );

            await loadShipments();

            setSelectedShipments({});

            dispatch(
                resetEditableShipmentsState()
            );

            setIsEditMode(false);

        } catch (err) {
            handleError(
                "Failed to update shipment."
            );
        }
    };

    return (
        <FormLayout
            title="Outbound Delivery Note"
            onClose={onClose}
            isLoading={isLoading}
        >
            <FormCardWrapper>
                <FormCard
                    title="WZ Details"
                >
                    <FormRow>
                        <FormSelect
                            id="contractor"
                            label="Contractor Selection *"
                            placeholder="Select a Contractor"
                            value={formData.contractor_tax_id}
                            handleChange={(val) =>
                                updateFormData(setFormData, "contractor_tax_id", val)
                            }
                            options={contractors.map((c) => ({
                                label: c.name,
                                value: c.tax_id,
                            }))}
                        />
                    </FormRow>
                    <FormTableWrapper>
                        <ShipmentsTable
                            data={displayedShipments}
                            selectedRows={selectedShipments}
                            setSelectedRows={setSelectedShipments}
                        />
                    </FormTableWrapper>
                </FormCard>
                <FormCard
                    title={selectedShipmentData?.document_number || "Document number"}
                    footer={isEditMode ? (
                        <>
                            <SubmitButton isLoading={isLoading} onClick={handleDisableEditMode} label="cancel" />
                            <SubmitButton isLoading={isLoading} onClick={handleSaveChanges} label="save" />
                        </>
                    ) : (
                        <>
                            <SubmitButton isLoading={isLoading} onClick={handleEnableEditMode} label="edit" />
                            <SubmitButton isLoading={isLoading} onClick={handlePrintDocument} />
                        </>)}

                >
                    <FormRow>
                        <ReadOnlyField
                            label="Contractor"
                            value={selectedShipmentData?.contractor_name}
                        />
                    </FormRow>
                    <FormRow>
                        <ReadOnlyField
                            label="Shipment Date"
                            value={selectedShipmentData?.created_at}
                        />
                    </FormRow>
                    <FormRow>
                        <ReadOnlyField
                            label="Delivery Address"
                            value={selectedShipmentData?.address}
                        />
                    </FormRow>

                    {isEditMode ? (
                        <>
                            <FormTableWrapper>
                                <EditableShipmentTable
                                    data={displayedEditableShipments}
                                    selectedRows={selectedEditableShipments}
                                    setSelectedRows={setSelectedEditableShipments}
                                    availablePallets={availablePallets}
                                    handlePalletChange={handlePalletChange}
                                    editedValues={editedValues}
                                    setEditedValues={setEditedValues}
                                />
                            </FormTableWrapper>
                            <FormActionsWrapper>
                                <TableActionButton
                                    handleClick={handleAddShipmentRow}
                                    type="add"
                                />
                                <TableActionButton
                                    handleClick={handleRemoveShipmentRows}
                                    type="remove"
                                />
                            </FormActionsWrapper>
                        </>
                    ) : (
                        <FormTableWrapper>
                            <ShipmentSummaryTable
                                data={selectedShipmentData?.pallets}
                            />
                        </FormTableWrapper>
                    )}

                </FormCard>
            </FormCardWrapper>
        </FormLayout >
    )
}