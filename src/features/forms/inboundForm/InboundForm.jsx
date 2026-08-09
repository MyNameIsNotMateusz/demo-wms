import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../auth/AuthProvider"
import { FormLayout } from "../../../components/layout"
import { useEffect, useState } from "react";
import { Form, FormActionsWrapper, FormRow, FormTableWrapper, ModalContainer } from "../../../components/ui/form/FormBase.styles";
import { FormInput, FormSelect, FormTabs, SubmitButton, TableActionButton } from "../../../components/ui";
import { updateFormData } from "../../../utils/forms/updateFormData";
import { ManualPalletsTable } from "./ManualPalletsTable";
import { selectManual, selectPlannedDeliveries, selectDeliveryItems, selectService } from "./inboundSelectors";
import { addManualPallet, removeManualPallets, clearManualState, setDeliveryItems, addDeliveryItem, removeDeliveryItems, clearDeliveryItems, fetchMaterials, addServiceItem, removeServiceItems, clearServiceState } from "./inboundFormSlice";
import { v4 as uuidv4 } from "uuid";
import { handleRemoveSelectedRows } from "../../../utils/table/removeSelectedRows";
import { handleError, handleSuccess } from "../../../utils/alerts";
import { validateManualInbound } from "./utils/validateManualInbound";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";
import { resetInboundForm } from "./utils/resetInboundForm";
import { PlannedDeliveriesTable } from "./PlannedDeliveriesTable";
import { tabsConfig } from "./tabsConfig";
import { updateSelectedDelivery } from "./utils/updateSelectedDelivery";
import { DeliveryItemsTable } from "./DeliveryItemsTable";
import { validatePlannedInbound } from "./utils/validatePlannedInbound";
import { printInboundLabels } from "./utils/printInboundLabels";
import { SearchMaterialModal } from "./SearchMaterialModal";
import { addSelectedMaterials } from "./utils/addSelectedMaterials";
import { getServicePallets } from "./api/getServicePallets";
import { ServicePalletsTable } from "./ServicePalletsTable";
import { fetchPlannedDeliveries } from "../../dictionaries/plannedDeliveriesSlice";
import { validateServiceInbound } from "./utils/validateServiceInbound";
import { calculateServiceConsumption } from "./utils/calculateServiceConsumption";
import { validateServiceInboundQuantities } from "./utils/validateServiceInboundQuantities";

export const InboundForm = ({ onClose }) => {
    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const displayedManual = useSelector(selectManual);
    const displayedPlannedDeliveries = useSelector(selectPlannedDeliveries);
    const displayedDeliveryItems = useSelector(selectDeliveryItems);
    const displayedService = useSelector(selectService);

    const userName = useSelector((state) => state.auth.user.name || "");
    const { contractors } = useSelector((state) => state.contractors);
    const { plannedDeliveries } = useSelector((state) => state.plannedDeliveries);
    const { manualPallets, deliveryItems, serviceItems } = useSelector((state) => state.inboundForm);

    const [formData, setFormData] = useState({
        inbound_type: "",
        contractor_tax_id: "",
        operator_name: "",
        delivery_reference_number: "",
        remarks: "",
    });

    const [activeTab, setActiveTab] = useState(0);
    const [editedValues, setEditedValues] = useState({});
    const [selectedManualRows, setSelectedManualRows] = useState({});
    const [selectedPlannedDeliveries, setSelectedPlannedDeliveries] = useState(
        {},
    );
    const [selectedDeliveryItems, setSelectedDeliveryItems] = useState({});
    const [plannedSeqNumbers, setPlannedSeqNumbers] = useState([]);
    const [plannedCodes, setPlannedCodes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalHandlers, setModalHandlers] = useState({
        onClose: null,
        onSubmit: null,
    });
    const [materialSearchModalData, setMaterialSearchModalData] = useState({
        contractor_tax_id: null,
        material_type: "COIL",
        width: null,
        thickness: null,
        metal_type: null,
    });
    const [selectedMaterials, setSelectedMaterials] = useState({});
    const [serviceCodes, setServiceCodes] = useState([]);
    const [selectedServiceRows, setSelectedServiceRows] = useState({});
    const [serviceData, setServiceData] = useState({
        pallets: [],
        recipes: [],
    });

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            contractor_tax_id: "",
        }));
    }, [formData.inbound_type]);

    useEffect(() => {
        const selectedId = Object.keys(selectedPlannedDeliveries)[0];

        if (!selectedId) {
            dispatch(setDeliveryItems(null));
            setPlannedSeqNumbers([]);
            setPlannedCodes([]);
            return;
        }

        const delivery = plannedDeliveries.find(
            (item) => item.id === selectedId
        );

        if (!delivery) {
            dispatch(setDeliveryItems(null));
            setPlannedSeqNumbers([]);
            setPlannedCodes([]);
            return;
        }

        updateSelectedDelivery({
            delivery,
            dispatch,
            setDeliveryItems,
            setPlannedSeqNumbers,
            setPlannedCodes,
            setFormData,
            updateFormData,
            setActiveTab,
        });
    }, [selectedPlannedDeliveries, plannedDeliveries]);

    useEffect(() => {
        setSelectedPlannedDeliveries({});
        setSelectedDeliveryItems({});
        setSelectedManualRows({});
        setSelectedServiceRows({});

        setServiceCodes([]);
        setServiceData({
            pallets: [],
            recipes: [],
        });

        setActiveTab(0);
    }, [formData.inbound_type]);

    useEffect(() => {
        if (!isModalOpen) {
            return;
        }

        setMaterialSearchModalData((prev) => ({
            ...prev,
            contractor_tax_id: formData.contractor_tax_id,
        }));
    }, [isModalOpen]);

    useEffect(() => {
        if (!isModalOpen) {
            return;
        }

        dispatch(
            fetchMaterials({
                token: accessToken,
                materialSearchModalData,
            })
        );
    }, [materialSearchModalData]);

    useEffect(() => {
        if (formData.inbound_type !== "SERVICE" || !formData.contractor_tax_id) {
            return;
        }

        const fetchServicePallets = async () => {
            try {
                const data = await getServicePallets(
                    formData.contractor_tax_id,
                    accessToken
                );

                setServiceData(data);

                const serviceCodes = [
                    ...data.pallets.map((item) => item.material_code),
                    ...data.recipes.map((item) => item.output_material.code),
                ];

                setServiceCodes(serviceCodes);
            } catch (error) {
                console.error(error);
            }
        };

        fetchServicePallets();
    }, [formData.contractor_tax_id, formData.inbound_type, accessToken]);

    useEffect(() => {
        if (formData.inbound_type === "SERVICE") {
            dispatch(clearServiceState());
        }
    }, [formData.contractor_tax_id, formData.inbound_type, dispatch]);

    const handleAddManualPallet = () => {
        const uniqueId = uuidv4();

        dispatch(
            addManualPallet({
                id: uniqueId,
                seq_number: "",
                material_code: "",
                name: "",
                type: "",
                quantity: 0,
                unit: "",
            })
        );
    };

    const handleAddDeliveryItem = () => {
        if (
            Object.keys(selectedPlannedDeliveries).length === 0
        ) {
            handleError("Please select a planned delivery.");
            return;
        }

        const uniqueId = uuidv4();

        dispatch(
            addDeliveryItem({
                id: uniqueId,
                seq_number: "",
                material_code: "",
                name: "",
                type: "",
                quantity: 0,
                unit: "",
                isNew: true,
            })
        );
    };

    const handleAddServiceItem = () => {
        const uniqueId = uuidv4();

        dispatch(
            addServiceItem({
                id: uniqueId,
                seq_number: "",
                material_code: "",
                name: "",
                type: "",
                batch: "",
                quantity: 0,
                unit: "",
            })
        );
    };

    const handleSearchMaterial = async (e) => {
        e.preventDefault();

        if (!formData.contractor_tax_id) {
            handleError("Please select a contractor.");
            return;
        }

        setIsModalOpen(true);

        const popupResult = await new Promise((resolve) => {
            setModalHandlers({
                onClose: () => resolve(false),
                onSubmit: (selectedMaterials) => resolve(selectedMaterials),
            });
        });

        if (!popupResult) {
            return;
        }

        await addSelectedMaterials({
            selectedMaterials: popupResult,
            accessToken,
            dispatch,
        });

        setSelectedMaterials({});
    };

    const handleSubmitModal = () => {
        setIsModalOpen(false);

        if (modalHandlers.onSubmit) {
            modalHandlers.onSubmit(selectedMaterials);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);

        if (modalHandlers.onClose) {
            modalHandlers.onClose();
        }

        setSelectedMaterials({});
    };

    const handleManualInbound = async () => {
        const isValid = validateManualInbound({
            formData,
            manualPallets,
            handleError,
        });

        if (!isValid) {
            return;
        }

        const payload = {
            inbound_type: "SUPPLIER_DELIVERY",
            contractor_tax_id: formData.contractor_tax_id,
            operator_name: formData.operator_name,
            delivery_reference_number:
                formData.delivery_reference_number,
            remarks: formData.remarks,
            items: manualPallets.map((item) => ({
                instance_id: null,
                material_code: item.material_code,
                quantity: item.quantity,
                ...(item.type === "COIL"
                    ? { batch: item.batch ?? "" }
                    : {}),
            })),
        };

        setIsLoading(true);

        try {
            const response = await fetch(
                `${BASE_API_URL}warehouse/logistics/inbound/`,
                {
                    method: "POST",
                    headers: DEFAULT_HEADERS(accessToken),
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();

                handleError(
                    errorData.message ||
                    "Failed to submit inbound."
                );

                return;
            }

            const data = await response.json();

            resetInboundForm({
                dispatch,
                reducer: clearManualState,
                setFormData,
            });

            handleSuccess("Operation completed successfully.");

            return data;
        } catch (err) {
            handleError(
                err.message ||
                "Unexpected error occurred."
            );
        } finally {
            setIsLoading(false);
        }
    }

    const handlePlannedInbound = async () => {
        const isValid = validatePlannedInbound({
            formData,
            selectedPlannedDeliveries,
            deliveryItems,
            handleError,
        });

        if (!isValid) {
            return;
        }

        const payload = {
            inbound_type: "SUPPLIER_DELIVERY",
            contractor_tax_id: formData.contractor_tax_id,
            operator_name: formData.operator_name,
            delivery_reference_number:
                formData.delivery_reference_number,
            plan_id: Object.keys(selectedPlannedDeliveries)[0],
            remarks: formData.remarks,
            items: deliveryItems.map((item) => ({
                instance_id: null,
                material_code: item.material_code,
                quantity: item.quantity,
                ...(item.type === "COIL"
                    ? { batch: item.batch ?? "" }
                    : {}),
            })),
        };

        setIsLoading(true);

        try {
            const response = await fetch(
                `${BASE_API_URL}warehouse/logistics/inbound/`,
                {
                    method: "POST",
                    headers: DEFAULT_HEADERS(accessToken),
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();

                handleError(
                    errorData.message ||
                    "Failed to submit inbound."
                );

                return;
            }

            const data = await response.json();

            resetInboundForm({
                dispatch,
                reducer: clearDeliveryItems,
                setFormData,
            });

            dispatch(fetchPlannedDeliveries(accessToken))

            handleSuccess("Operation completed successfully.");

            return data;
        } catch (err) {
            handleError(
                err.message ||
                "Unexpected error occurred."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleServiceInbound = async () => {
        const isValid = validateServiceInbound({
            formData,
            serviceItems,
            handleError,
        });

        if (!isValid) {
            return;
        }

        const consumption = calculateServiceConsumption({
            serviceItems,
            recipes: serviceData.recipes,
        });

        const hasValidQuantities = validateServiceInboundQuantities({
            pallets: serviceData.pallets,
            consumption,
            handleError,
        });

        if (!hasValidQuantities) {
            return;
        }

        const payload = {
            inbound_type: "SERVICE",
            contractor_tax_id: formData.contractor_tax_id,
            operator_name: formData.operator_name,
            delivery_reference_number: formData.delivery_reference_number,
            remarks: formData.remarks,
            items: serviceItems.map((item) => ({
                instance_id: null,
                material_code: item.material_code,
                quantity: item.quantity,
                ...(item.type === "COIL"
                    ? { batch: item.batch ?? "" }
                    : {}),
            })),
        };

        setIsLoading(true);

        try {
            const response = await fetch(
                `${BASE_API_URL}warehouse/logistics/inbound/`,
                {
                    method: "POST",
                    headers: DEFAULT_HEADERS(accessToken),
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();

                handleError(
                    errorData.message ||
                    "Failed to submit inbound."
                );

                return;
            }

            const data = await response.json();

            resetInboundForm({
                dispatch,
                reducer: clearServiceState,
                setFormData,
            });

            handleSuccess("Operation completed successfully.");

            return data;
        } catch (err) {
            handleError(
                err.message ||
                "Unexpected error occurred."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (formData.inbound_type === "MANUAL") {
            const result = await handleManualInbound();
            printInboundLabels(result);
        } else if (formData.inbound_type === "PLANNED") {
            const result = await handlePlannedInbound();
            printInboundLabels(result);
        } else if (formData.inbound_type === "SERVICE") {
            const result = await handleServiceInbound();
            printInboundLabels(result);
        }
    };

    return (
        <FormLayout
            title="Inbound Form"
            onClose={onClose}
            isLoading={isLoading}
        >
            <Form>
                <FormRow>
                    <FormSelect
                        id="inbound_type"
                        label="Inbound Type *"
                        placeholder="Select an Inbound Type"
                        value={formData.inbound_type}
                        handleChange={(val) =>
                            updateFormData(setFormData, "inbound_type", val)
                        }
                        options={[
                            { label: "Manual Inbound", value: "MANUAL" },
                            { label: "Planned Inbound", value: "PLANNED" },
                            { label: "Service Inbound", value: "SERVICE" },
                        ]}
                    />
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
                        isDisabled={
                            !formData.inbound_type ||
                            Object.keys(selectedPlannedDeliveries).length > 0
                        }
                    />
                    <FormInput
                        id="operator_name"
                        label="Operator Name *"
                        type="text"
                        value={formData.operator_name}
                        handleChange={(val) =>
                            updateFormData(setFormData, "operator_name", val)
                        }
                    />
                </FormRow>
                <FormRow>
                    <FormInput
                        id="delivery_reference_number"
                        label={formData.inbound_type === "SERVICE" ? "Service Reference Number" : "Delivery Reference Number"}
                        type="text"
                        value={formData.delivery_reference_number}
                        handleChange={(val) =>
                            updateFormData(setFormData, "delivery_reference_number", val)
                        }
                    />
                    <FormInput
                        id="workstation"
                        label="Workstation"
                        type="text"
                        value={userName}
                        disabled="true"
                    />
                    <FormInput
                        id="remarks"
                        label="Remarks"
                        type="text"
                        value={formData.remarks}
                        handleChange={(val) =>
                            updateFormData(setFormData, "remarks", val)
                        }
                    />
                </FormRow>
                {formData.inbound_type === "MANUAL" && (
                    <>
                        <FormTableWrapper>
                            {isModalOpen && (
                                <ModalContainer>
                                    <SearchMaterialModal
                                        handleClose={handleCloseModal}
                                        handleSubmit={handleSubmitModal}
                                        modalData={materialSearchModalData}
                                        setModalData={setMaterialSearchModalData}
                                        selectedRows={selectedMaterials}
                                        setSelectedRows={setSelectedMaterials}
                                    />
                                </ModalContainer>
                            )}
                            <ManualPalletsTable
                                data={displayedManual}
                                selectedRows={selectedManualRows}
                                setSelectedRows={setSelectedManualRows}
                                editedValues={editedValues}
                                setEditedValues={setEditedValues}
                            />
                        </FormTableWrapper>
                        <FormActionsWrapper>
                            <TableActionButton
                                handleClick={handleAddManualPallet}
                                type="add"
                            />
                            <TableActionButton
                                handleClick={() =>
                                    handleRemoveSelectedRows(
                                        selectedManualRows,
                                        displayedManual,
                                        setSelectedManualRows,
                                        removeManualPallets,
                                        dispatch,
                                        handleError
                                    )
                                }
                                type="remove"
                            />
                            <TableActionButton
                                handleClick={handleSearchMaterial}
                                type="search"
                            />
                        </FormActionsWrapper>
                    </>
                )}

                {(formData.inbound_type === "PLANNED" && activeTab === 0) && (
                    <FormTableWrapper>
                        <PlannedDeliveriesTable
                            data={displayedPlannedDeliveries}
                            selectedRows={selectedPlannedDeliveries}
                            setSelectedRows={setSelectedPlannedDeliveries}
                        />
                    </FormTableWrapper>
                )}
                {(formData.inbound_type === "PLANNED" && activeTab === 1) && (
                    <>
                        <FormTableWrapper>
                            <DeliveryItemsTable
                                data={displayedDeliveryItems}
                                selectedRows={selectedDeliveryItems}
                                setSelectedRows={setSelectedDeliveryItems}
                                availableSeqNumbers={plannedSeqNumbers}
                                availableMaterialCodes={plannedCodes}
                                editedValues={editedValues}
                                setEditedValues={setEditedValues}
                            />
                        </FormTableWrapper>
                        <FormActionsWrapper>
                            <TableActionButton
                                handleClick={handleAddDeliveryItem}
                                type="add"
                            />
                            <TableActionButton
                                handleClick={() =>
                                    handleRemoveSelectedRows(
                                        selectedDeliveryItems,
                                        displayedDeliveryItems,
                                        setSelectedDeliveryItems,
                                        removeDeliveryItems,
                                        dispatch,
                                        handleError
                                    )
                                }
                                type="remove"
                            />
                        </FormActionsWrapper>
                    </>
                )}
                {formData.inbound_type === "PLANNED" && (
                    <FormTabs
                        tabs={tabsConfig}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                )}
                {formData.inbound_type === "SERVICE" && (
                    <>
                        <FormTableWrapper>
                            <ServicePalletsTable
                                data={displayedService}
                                selectedRows={selectedServiceRows}
                                setSelectedRows={setSelectedServiceRows}
                                availableMaterialCodes={serviceCodes}
                                editedValues={editedValues}
                                setEditedValues={setEditedValues}
                            />
                        </FormTableWrapper>
                        <FormActionsWrapper>
                            <TableActionButton
                                handleClick={handleAddServiceItem}
                                type="add"
                            />
                            <TableActionButton
                                handleClick={() =>
                                    handleRemoveSelectedRows(
                                        selectedServiceRows,
                                        displayedService,
                                        setSelectedServiceRows,
                                        removeServiceItems,
                                        dispatch,
                                        handleError
                                    )
                                }
                                type="remove"
                            />
                        </FormActionsWrapper>
                    </>
                )}
            </Form>
            <SubmitButton
                isLoading={isLoading}
                onClick={handleSubmit}
            />
        </FormLayout>
    )
}