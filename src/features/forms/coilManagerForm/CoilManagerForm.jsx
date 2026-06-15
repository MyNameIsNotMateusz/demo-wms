import { useEffect, useState } from "react";
import { getCoilDetails } from "./api/getCoilDetails";
import { useAuth } from "../../../auth/AuthProvider";
import { useBarcodeScanner } from "../../../hooks/useBarcodeScanner";
import { FormCard, FormLayout } from "../../../components/layout";
import { updateCoilDetailsFormData } from "./utils/updateCoilDetailsFormData";
import { FormCardWrapper, FormRow, FormTableWrapper, ModalContainer } from "../../../components/ui/form/FormBase.styles";
import { FormInput, FormSelect, FormTabs, ReadOnlyField, SubmitButton } from "../../../components/ui";
import { updateFormData } from "../../../utils/forms/updateFormData";
import { fetchProductionCoils, fetchConsumedCoils } from "./coilManagerFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateIssueCoil } from "./utils/validateIssueCoil";
import { issueCoil } from "./api/issueCoil";
import { resetCoilManagerForm } from "./utils/resetCoilManagerForm";
import { handleError, handleSuccess } from "../../../utils/alerts";
import { tabsConfig } from "./tabsConfig";
import { ProductionTable } from "./ProductionTable";
import { selectProductionCoils, selectConsumedCoils } from "./coilManagerFormSelectors";
import { consumeCoil } from "./api/consumeCoil";
import { findCoilById } from "./utils/findCoilById";
import { returnCoil } from "./api/returnCoil";
import { resetReturnCoilState } from "./utils/resetReturnCoilState";
import { prepareCoilLabelsForPrint } from "./utils/prepareCoilLabelsForPrint";
import { printCoilLabels } from "../../../utils/pdf/coilLabels/printCoilLabels";
import { ReturnCoilModal } from "./ReturnCoilModal";
import { ConsumedTable } from "./ConsumedTable";

export const CoilManagerForm = ({ onClose }) => {
    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        coil_id: "",
        operator_name: "",
        remarks: "",
        line: "",
        material_code: "",
        material_name: "",
        thickness: "",
        width: "",
        metal_type: "",
        batch: "",
        weight: "",
    });

    const displayedProductionCoils = useSelector(selectProductionCoils);
    const displayedConsumedCoils = useSelector(selectConsumedCoils);

    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const { productionCoils, consumedCoils } = useSelector((state) => state.coilManagerForm);

    const [selectedProductionCoils, setSelectedProductionCoils] = useState({});
    const [selectedConsumedCoils, setSelectedConsumedCoils] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalHandlers, setModalHandlers] = useState({
        onClose: null,
        onSubmit: null,
    });
    const [returnModalData, setReturnModalData] = useState({
        coil_id: "",
        weight: "",
        returned_weight: "",
        operator_name: "",
        remarks: "",
    });

    useEffect(() => {
        dispatch(fetchProductionCoils(accessToken));
        dispatch(fetchConsumedCoils(accessToken));
    }, [dispatch]);

    useEffect(() => {
        const fetchCoilDetails = async () => {
            if (!formData.coil_id?.trim()) {
                updateCoilDetailsFormData(setFormData, null);
                return;
            }

            const coilDetails = await getCoilDetails(
                formData.coil_id,
                accessToken
            );

            updateCoilDetailsFormData(
                setFormData,
                coilDetails
            );
        };

        fetchCoilDetails();
    }, [formData.coil_id, accessToken]);

    useEffect(() => {
        setSelectedProductionCoils({});
        setSelectedConsumedCoils({});
    }, [activeTab]);

    useBarcodeScanner((coilId) => {
        setFormData((prev) => ({
            ...prev,
            coil_id: coilId,
        }));
    });

    const handleIssueCoil = async () => {
        const isValid = validateIssueCoil({
            formData,
            productionCoils,
            consumedCoils,
            handleError,
        });

        if (!isValid) return;

        const payload = {
            coil_id: formData.coil_id,
            line: formData.line,
            operator_name: formData.operator_name,
            remarks: formData.remarks,
        };

        setIsLoading(true);

        try {
            const response = await issueCoil(
                payload,
                accessToken
            );

            if (!response.ok) {
                const errorData = await response.json();

                console.error(
                    "Błąd podczas wysyłania coila na produkcję:",
                    errorData
                );

                handleError(
                    errorData.message ||
                    "Failed to issue coil to production."
                );

                return;
            }

            handleSuccess(
                "Operation completed successfully."
            );

            resetCoilManagerForm(setFormData);

            dispatch(fetchProductionCoils(accessToken));
        } catch (error) {
            console.error(error);

            handleError(
                "Failed to issue coil to production."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleConsumeCoil = async () => {
        if (Object.keys(selectedProductionCoils).length === 0) {
            handleError("Please select a coil.");
            return;
        }

        const payload = {
            coil_id: Object.keys(selectedProductionCoils)[0],
        };

        setIsLoading(true);

        try {
            const response = await consumeCoil(
                payload,
                accessToken
            );

            if (!response.ok) {
                const errorData = await response.json();

                console.error(
                    "Error while consuming coil:",
                    errorData
                );

                handleError(
                    errorData.message ||
                    "Failed to mark coil as consumed."
                );

                return;
            }

            handleSuccess(
                "Operation completed successfully."
            );

            setSelectedProductionCoils({});

            dispatch(fetchProductionCoils(accessToken));
            dispatch(fetchConsumedCoils(accessToken));
        } catch (error) {
            console.error(error);

            handleError(
                "Failed to mark coil as consumed."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleReturnSelected = async () => {
        if (
            Object.keys(selectedProductionCoils).length === 0 &&
            Object.keys(selectedConsumedCoils).length === 0
        ) {
            handleError("Please select a coil.");
            return;
        }

        const selectedCoilId =
            Object.keys(selectedProductionCoils)[0] ||
            Object.keys(selectedConsumedCoils)[0];

        const selectedCoil = findCoilById(
            selectedCoilId,
            productionCoils,
            consumedCoils
        );

        setReturnModalData({
            coil_id: selectedCoil.coil_id,
            weight: selectedCoil.weight,
            returned_weight: "",
            operator_name: "",
            remarks: "",
        });

        setIsModalOpen(true);

        const popupResult = await new Promise((resolve) => {
            setModalHandlers({
                onClose: () => resolve(false),
                onSubmit: (latestReturnForm) =>
                    resolve({
                        submitted: true,
                        data: latestReturnForm,
                    }),
            });
        });

        if (!popupResult || popupResult.submitted === false) return;

        const {
            coil_id,
            returned_weight,
            operator_name,
            remarks,
        } = popupResult.data;

        const payload = {
            coil_id,
            returned_weight,
            operator_name,
            remarks,
        };

        setIsLoading(true);

        try {
            const response = await returnCoil(
                payload,
                accessToken
            );

            if (!response.ok) {
                const errorData = await response.json();

                console.error(
                    "Error while returning coil:",
                    errorData
                );

                handleError(
                    errorData.message ||
                    "Failed to return coil."
                );

                return;
            }

            handleSuccess(
                "Operation completed successfully."
            );

            resetReturnCoilState({
                setReturnModalData,
                setSelectedProductionCoils,
                setSelectedConsumedCoils,
            });

            dispatch(fetchProductionCoils(accessToken));
            dispatch(fetchConsumedCoils(accessToken));

            const labelsToPrint = prepareCoilLabelsForPrint(
                selectedCoil,
                returned_weight
            );

            if (labelsToPrint?.length > 0) {
                printCoilLabels(labelsToPrint);
            }
        } catch (error) {
            console.error(error);

            handleError(
                "Failed to return coil."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitModal = () => {
        if (Number(returnModalData.returned_weight) <= 0) {
            handleError("Returned weight must be more than 0");
            return;
        }

        if (
            Number(returnModalData.returned_weight) >
            Number(returnModalData.weight)
        ) {
            handleError(
                "Returned weight cannot be more than the original weight"
            );
            return;
        }

        setIsModalOpen(false);

        if (modalHandlers.onSubmit) {
            modalHandlers.onSubmit(returnModalData);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);

        if (modalHandlers.onClose) {
            modalHandlers.onClose();
        }
    };

    const lines = ["Line1", "Line2", "Line3", "Line4"];

    return (
        <FormLayout
            title="Coil Manager Form"
            onClose={onClose}
            isLoading={isLoading}
        >
            <FormCardWrapper>
                <FormCard
                    title="Scan Coil"
                    footer={
                        <SubmitButton
                            isLoading={isLoading}
                            onClick={handleIssueCoil}
                            label="Send to Production"
                        />
                    }
                >
                    <FormRow>
                        <FormInput
                            id="coil_id"
                            label="Enter ID *"
                            type="text"
                            value={formData.coil_id}
                            handleChange={(val) => {
                                updateFormData(setFormData, "coil_id", val);
                            }}
                        />
                    </FormRow>
                    <FormRow>
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
                            id="remarks"
                            label="Remarks"
                            type="text"
                            value={formData.remarks}
                            handleChange={(val) =>
                                updateFormData(setFormData, "remarks", val)
                            }
                        />
                    </FormRow>
                    <FormRow>
                        <FormSelect
                            id="line"
                            label="Line"
                            placeholder="Select a line"
                            value={formData.line}
                            handleChange={(val) =>
                                updateFormData(setFormData, "line", val)
                            }
                            options={lines.map((l) => ({
                                label: l,
                                value: l
                            }))}
                        />
                    </FormRow>
                    <FormRow>
                        <ReadOnlyField
                            label="Material Code"
                            value={formData.material_code}
                        />
                    </FormRow>
                    <FormRow>
                        <ReadOnlyField
                            label="Material Name"
                            value={formData.material_name}
                        />
                    </FormRow>
                    <FormRow>
                        <ReadOnlyField
                            label="Thickness"
                            value={formData.thickness}
                        />
                    </FormRow>
                    <FormRow>
                        <ReadOnlyField
                            label="Width"
                            value={formData.width}
                        />
                    </FormRow>
                    <FormRow>
                        <ReadOnlyField
                            label="Specification"
                            value={formData.metal_type}
                        />
                    </FormRow>
                    <FormRow>
                        <ReadOnlyField
                            label="Batch"
                            value={formData.batch}
                        />
                    </FormRow>
                    <FormRow>
                        <ReadOnlyField
                            label="Weight"
                            value={formData.weight}
                        />
                    </FormRow>
                </FormCard>
                <FormCard
                    title="Coils in Production"
                    footer={
                        <>
                            <SubmitButton
                                isLoading={isLoading}
                                onClick={handleReturnSelected}
                                label="Return Selected"
                            />

                            {activeTab === 0 && (
                                <SubmitButton
                                    isLoading={isLoading}
                                    onClick={handleConsumeCoil}
                                    label="Mark as Consumed"
                                />
                            )}
                        </>
                    }
                    tabs={<FormTabs
                        tabs={tabsConfig}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />}
                >
                    <FormRow>
                        <ReadOnlyField
                            label="Coil ID"
                            value={Object.keys(selectedProductionCoils)[0]}
                        />
                    </FormRow>
                    <FormTableWrapper>
                        {isModalOpen && (
                            <ModalContainer>
                                <ReturnCoilModal
                                    handleClose={handleCloseModal}
                                    handleSubmit={handleSubmitModal}
                                    modalData={returnModalData}
                                    setModalData={setReturnModalData}
                                />
                            </ModalContainer>
                        )}
                        {activeTab === 0 && (
                            <ProductionTable
                                data={displayedProductionCoils}
                                selectedRows={selectedProductionCoils}
                                setSelectedRows={setSelectedProductionCoils}
                            />
                        )}
                        {activeTab === 1 && (
                            <ConsumedTable
                                data={displayedConsumedCoils}
                                selectedRows={selectedConsumedCoils}
                                setSelectedRows={setSelectedConsumedCoils}
                            />
                        )}
                    </FormTableWrapper>
                </FormCard>
            </FormCardWrapper>
        </FormLayout>
    )
}