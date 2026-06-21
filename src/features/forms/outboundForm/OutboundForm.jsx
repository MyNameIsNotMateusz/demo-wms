import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../auth/AuthProvider";
import { useEffect, useState } from "react";
import { FormLayout } from "../../../components/layout";
import { Form, FormActionsWrapper, FormRow, FormTableWrapper } from "../../../components/ui/form/FormBase.styles";
import { FormInput, FormSelect, FormTabs, ReadOnlyField, SubmitButton } from "../../../components/ui";
import { tabsConfig } from "./tabsConfig";
import { updateFormData } from "../../../utils/forms/updateFormData";
import { getPallets } from "./api/getPallets";
import { setPallets, setSelectedPalletsData, clearState } from "./outboundFormSlice";
import { selectPallets, selectSelectedPallets, selectSummary } from "./outboundSelectors";
import { AvailablePalletsTable } from "./AvailablePalletsTable";
import { SelectedPalletsTable } from "./SelectedPalletsTable";
import { SummaryTable } from "./SummaryTable";
import { handleScanPallet } from "./utils/handleScanPallet";
import { useBarcodeScanner } from "../../../hooks/useBarcodeScanner";
import { handleError, handleSuccess } from "../../../utils/alerts";
import { validateOutboundForm } from "./utils/validateOutboundForm";
import { buildShipmentPayload } from "./utils/buildShipmentPayload";
import { resetOutboundForm } from "./utils/resetOutboundForm";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";

export const OutboundForm = ({ onClose }) => {
    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const displayedPallets = useSelector(selectPallets);
    const displayedSelectedPallets = useSelector(selectSelectedPallets);
    const displayedSummary = useSelector(selectSummary);

    const userName = useSelector((state) => state.auth.user.name || "");
    const { contractors } = useSelector((state) => state.contractors);
    const { pallets, selectedPallets } = useSelector((state) => state.outboundForm);

    const [formData, setFormData] = useState({
        outbound_type: "",
        date: "",
        contractor_tax_id: "",
        operator_name: "",
        remarks: "",
        customer_order_number: "",
        service_request_number: "",
    });

    const [activeTab, setActiveTab] = useState(0);
    const [isScanSelectMode, setIsScanSelectMode] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [selectedPalletRows, setSelectedPalletRows] = useState({});

    useEffect(() => {
        dispatch(clearState());
        setSelectedPalletRows({});
    }, [formData.contractor_tax_id]);

    useEffect(() => {
        const today = new Date();

        const formattedDate = [
            String(today.getMonth() + 1).padStart(2, "0"),
            String(today.getDate()).padStart(2, "0"),
            today.getFullYear(),
        ].join("/");

        setFormData((prev) => ({
            ...prev,
            date: formattedDate,
        }));
    }, []);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            customer_order_number: "",
            service_request_number: "",
        }));
    }, [formData.outbound_type]);

    useEffect(() => {
        const loadPallets = async () => {
            try {
                const pallets = await getPallets(
                    formData.outbound_type,
                    formData.contractor_tax_id,
                    accessToken
                );

                dispatch(setPallets(pallets));
            } catch (error) {
                console.error(error);
            }
        };

        loadPallets();
    }, [formData.contractor_tax_id, refreshTrigger]);

    useEffect(() => {
        const selectedPalletIds = Object.keys(selectedPalletRows);

        dispatch(setSelectedPalletsData(selectedPalletIds));
    }, [selectedPalletRows]);

    useBarcodeScanner((palletId) => {
        if (!formData.contractor_tax_id) {
            return;
        }

        const palletExists = pallets.some(
            (pallet) => pallet.pallet_id === palletId
        );

        if (!palletExists) {
            handleError("This pallet is not approved for shipment.");
            return;
        }

        handleScanPallet(
            palletId,
            isScanSelectMode,
            setSelectedPalletRows
        );
    });

    const selectedContractor = contractors.find(
        (contractor) =>
            contractor.tax_id === formData.contractor_tax_id
    );

    const handleRefreshPallets = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    const handleSubmit = async () => {
        const isValid =
            validateOutboundForm({
                selectedPallets,
                formData,
                handleError,
            });

        if (!isValid) {
            return;
        }

        const payload =
            buildShipmentPayload({
                formData,
                selectedPallets,
            });

        setIsLoading(true);

        try {
            const response = await fetch(
                `${BASE_API_URL}warehouse/logistics/shipments/`,
                {
                    method: "POST",
                    headers:
                        DEFAULT_HEADERS(
                            accessToken
                        ),
                    body: JSON.stringify(
                        payload
                    ),
                }
            );

            if (!response.ok) {
                const errorData =
                    await response.json();

                handleError(
                    errorData.message ||
                    "Failed to submit shipment."
                );

                return;
            }

            handleSuccess(
                "Operation completed successfully."
            );

            resetOutboundForm({
                dispatch,
                clearState,
                setFormData,
            });
        } catch (err) {
            handleError(
                err.message ||
                "Unexpected error occurred."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormLayout title="Outbound Form" onClose={onClose} isLoading={isLoading}>
            <Form>
                <FormRow>
                    <FormSelect
                        id="outbound_type"
                        label="Outbound Type *"
                        placeholder="Select an Outbound Type"
                        value={formData.outbound_type}
                        handleChange={(val) =>
                            updateFormData(setFormData, "outbound_type", val)
                        }
                        options={[
                            { label: "Shipment to Customer", value: "SHIPMENT_CUSTOMER" },
                            { label: "Shipment to Service", value: "SHIPMENT_SERVICE" },
                            { label: "Other", value: "OTHER" },
                        ]}
                    />
                    <FormInput
                        id="date"
                        label="Date"
                        type="text"
                        value={formData.date}
                        disabled="true"
                    />
                    <FormInput
                        id="workstation"
                        label="Workstation"
                        type="text"
                        value={userName}
                        disabled="true"
                    />
                </FormRow>
                <FormRow>
                    <FormSelect
                        id="contractor"
                        label="Contractor Selection *"
                        placeholder="Select a Contractor"
                        value={formData.contractor_tax_id}
                        handleChange={(val) =>
                            updateFormData(setFormData, "contractor_tax_id", val)
                        }
                        options={contractors.map((p) => ({
                            label: p.name,
                            value: p.tax_id,
                        }))}
                        isDisabled={!formData.outbound_type}
                    />
                    <FormInput
                        id="contractor_tax_id"
                        label="NIP"
                        type="text"
                        value={formData.contractor_tax_id}
                        disabled="true"
                    />
                    <FormInput
                        id="address"
                        label="Address"
                        type="text"
                        value={selectedContractor?.address}
                        disabled="true"
                    />
                </FormRow>
                <FormRow>
                    <FormInput
                        id="operator_name"
                        label="Operator *"
                        type="text"
                        value={formData.operator_name}
                        handleChange={(val) =>
                            updateFormData(setFormData, "operator_name", val)
                        }
                    />
                    {formData.outbound_type == "SHIPMENT_CUSTOMER" && (
                        <FormInput
                            id="customer_order_number"
                            label="Customer Order Number *"
                            type="text"
                            value={formData.customer_order_number}
                            handleChange={(val) =>
                                updateFormData(setFormData, "customer_order_number", val)
                            }
                        />
                    )}
                    {formData.outbound_type == "SHIPMENT_SERVICE" && (
                        <FormInput
                            id="service_request_number"
                            label="Service Request Number *"
                            type="text"
                            value={formData.service_request_number}
                            handleChange={(val) =>
                                updateFormData(setFormData, "service_request_number", val)
                            }
                        />
                    )}
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
                <FormTableWrapper>
                    {activeTab === 0 && (
                        <AvailablePalletsTable
                            data={displayedPallets}
                            selectedRows={selectedPalletRows}
                            setSelectedRows={setSelectedPalletRows}
                        />
                    )}
                    {activeTab === 1 && (
                        <SelectedPalletsTable
                            data={displayedSelectedPallets}
                            selectedRows={selectedPalletRows}
                            setSelectedRows={setSelectedPalletRows}
                        />
                    )}
                    {activeTab === 2 && (
                        <SummaryTable
                            data={displayedSummary}
                        />
                    )}
                </FormTableWrapper>
                <FormTabs
                    tabs={tabsConfig}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
            </Form>
            <FormActionsWrapper>
                <SubmitButton isLoading={isLoading} onClick={() => setIsScanSelectMode(prev => !prev)} label={isScanSelectMode ? "Scan: Select" : "Scan: Deselect"} />
                <SubmitButton isLoading={isLoading} onClick={handleRefreshPallets} label="Refresh List" />
                <SubmitButton
                    isLoading={isLoading}
                    onClick={handleSubmit} />
            </FormActionsWrapper>
        </FormLayout>
    )
};