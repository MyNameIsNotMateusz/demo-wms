import { FormLayout } from "../../../components/layout"
import { updateFormData } from "../../../utils/forms/updateFormData"
import { Form, FormRow } from "../../../components/ui/form/FormBase.styles";
import { FormInput, FormSelect, SubmitButton, FetchButton } from "../../../components/ui";
import { useState } from "react";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";
import { useAuth } from "../../../auth/AuthProvider";
import { handleError, handleSuccess } from "../../../utils/alerts";

export const UserForm = ({ title, onClose, isLoading, formData, setFormData, mode, handleSubmit }) => {
    const { accessToken } = useAuth();

    const [isFetchingContractor, setIsFetchingContractor] = useState(false);

    const handleFetchContractor = async (e) => {
        e.preventDefault();

        const jsonPayload = {
            nip: formData.tax_id,
        };

        setIsFetchingContractor(true);

        try {
            const response = await fetch(
                `${BASE_API_URL}common/contractors/gus-fetch/`,
                {
                    method: "POST",
                    headers: DEFAULT_HEADERS(accessToken),
                    body: JSON.stringify(jsonPayload),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                const backendMessage =
                    errorData?.errors?.join(", ") ||
                    "Error while fetching contractor data";
                throw new Error(backendMessage);
            }

            const data = await response.json();
            const { tax_id, name, regon, address, legal_form } = data;

            setFormData((prev) => ({
                ...prev,
                tax_id,
                name,
                regon,
                address,
                legal_form,
                contractor_type: "COMPANY",
            }));
        } catch (error) {
            console.error(error);
            handleError(`Operation failed: ${error.message}`);
        } finally {
            setIsFetchingContractor(false);
        }
    };

    const contractorTypes = ["COMPANY", "INDIVIDUAL", "FOREIGN", "SELF"];

    return (
        <FormLayout
            title={title}
            onClose={onClose}
        >
            <Form>
                <FormRow>
                    <FormInput
                        id="tax_id"
                        label="NIP *"
                        type="number"
                        value={formData.tax_id}
                        handleChange={(val) =>
                            updateFormData(setFormData, "tax_id", val)
                        }
                        extra={<FetchButton active={!!formData.tax_id} disabled={isFetchingContractor} onClick={handleFetchContractor} isLoading={isLoading} />}
                    />
                    <FormInput
                        id="name"
                        label="Name *"
                        type="text"
                        value={formData.name}
                        handleChange={(val) =>
                            updateFormData(setFormData, "name", val)
                        }
                    />
                    <FormInput
                        id="regon"
                        label="REGON"
                        type="number"
                        value={formData.regon}
                        handleChange={(val) =>
                            updateFormData(setFormData, "regon", val)
                        }
                    />
                </FormRow>

                <FormRow>
                    <FormInput
                        id="address"
                        label="Address *"
                        type="text"
                        value={formData.address}
                        handleChange={(val) =>
                            updateFormData(setFormData, "address", val)
                        }
                    />
                    <FormInput
                        id="country"
                        label="Country *"
                        type="text"
                        value={formData.country}
                        handleChange={(val) =>
                            updateFormData(setFormData, "country", val)
                        }
                    />
                    <FormInput
                        id="email"
                        label="Email"
                        type="email"
                        value={formData.email}
                        handleChange={(val) =>
                            updateFormData(setFormData, "email", val)
                        }
                    />
                </FormRow>

                <FormRow>
                    <FormInput
                        id="phone_number"
                        label="Phone Number"
                        type="tel"
                        value={formData.phone_number}
                        handleChange={(val) =>
                            updateFormData(setFormData, "phone_number", val)
                        }
                    />
                    <FormInput
                        id="bank_account"
                        label="Bank Account"
                        type="text"
                        value={formData.bank_account}
                        handleChange={(val) =>
                            updateFormData(setFormData, "bank_account", val)
                        }
                    />
                    <FormInput
                        id="legal_form"
                        label="Legal Form"
                        type="text"
                        value={formData.legal_form}
                        handleChange={(val) =>
                            updateFormData(setFormData, "legal_form", val)
                        }
                    />
                </FormRow>

                <FormRow>
                    <FormSelect
                        id="contractor_type"
                        label="Contractor Type Selection *"
                        placeholder="Select contractor type"
                        value={formData.contractor_type}
                        handleChange={(val) =>
                            updateFormData(setFormData, "contractor_type", val)
                        }
                        options={contractorTypes.map((type) => ({
                            label: type,
                            value: type,
                        }))}
                    />
                </FormRow>

            </Form>
            <SubmitButton
                isLoading={isLoading}
                onClick={handleSubmit}
            />
        </FormLayout>
    )
}