import { FormLayout } from "../../../components/layout"
import { useState } from "react";
import { FormRow, Form } from "../../../components/ui/form/FormBase.styles";
import { FormInput, SubmitButton } from "../../../components/ui";
import { updateFormData } from "../../../utils/forms/updateFormData"
import { useAuth } from "../../../auth/AuthProvider";
import { validateChangePassword } from "./utils/changePasswordValidation";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";
import { handleError, handleSuccess } from "../../../utils/alerts";

export const ChangePasswordForm = ({ onClose }) => {
    const { accessToken } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        old_password: "",
        new_password: "",
        confirm_new_password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const isValid = validateChangePassword(formData, handleError);

            if (!isValid) {
                setIsLoading(false);
                return;
            }

            const response = await fetch(
                `${BASE_API_URL}common/users/change-password/`,
                {
                    method: "POST",
                    headers: DEFAULT_HEADERS(accessToken),
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                const errorBody = await response.json();
                console.error("Błąd z backendu:", errorBody);
                handleError(errorBody.message || "Operation failed.");
                return;
            }

            handleSuccess("Operation completed successfully.");

            setFormData({
                old_password: "",
                new_password: "",
                confirm_new_password: "",
            });
        } catch (error) {
            console.error(error);
            handleError(`Operation failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormLayout
            title="Change Password Form"
            onClose={onClose}
            isLoading={isLoading}
        >
            <Form>
                <FormRow>
                    <FormInput
                        id="old_password"
                        label="Current Password *"
                        type="password"
                        value={formData.old_password}
                        handleChange={(val) =>
                            updateFormData(setFormData, "old_password", val)
                        }
                    />
                </FormRow>
                <FormRow>
                    <FormInput
                        id="new_password"
                        label="New Password *"
                        type="password"
                        value={formData.new_password}
                        handleChange={(val) =>
                            updateFormData(setFormData, "new_password", val)
                        }
                    />
                </FormRow>
                <FormRow>
                    <FormInput
                        id="confirm_new_password"
                        label="Confirm New Password *    "
                        type="password"
                        value={formData.confirm_new_password}
                        handleChange={(val) =>
                            updateFormData(setFormData, "confirm_new_password", val)
                        }
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