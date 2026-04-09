import { FormLayout } from "../../../components/layout"
import { updateFormData } from "../../../utils/forms/updateFormData"
import { Form, FormRow, CheckboxGroup } from "../../../components/ui/form/FormBase.styles";
import { UserFormGroup } from "./UserFormGroup";
import { FormInput, FormSelect, CheckboxField, SubmitButton } from "../../../components/ui";
import { useState } from "react";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";
import { useAuth } from "../../../auth/AuthProvider";
import { handleError, handleSuccess } from "../../../utils/alerts";
import { useSelector } from "react-redux";
import { handleCloseForm } from "../../../utils/forms/handleCloseForm";

export const UserForm = ({ title, isLoading, formData, setFormData, mode, selectAllAccesses, selectedAccesses, toggleAllChildren, toggleAccess, handleSubmit, setIsUserFormVisible, setMode }) => {
    const { accessToken } = useAuth();

    const [isResettingPassword, setIsResettingPassword] = useState(false);

    const { accessTabs } = useSelector(
        (state) => state.userManagementForm,
    );

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        const jsonPayload = {
            email: formData.email,
        };

        setIsResettingPassword(true);

        try {
            const response = await fetch(
                `${BASE_API_URL}common/users/reset-password/`,
                {
                    method: "POST",
                    headers: DEFAULT_HEADERS(accessToken),
                    body: JSON.stringify(jsonPayload),
                },
            );

            if (!response.ok) {
                const errorData = await response.json();
                const backendMessage =
                    errorData?.errors?.join(", ") || "Error resetting password";
                throw new Error(backendMessage);
            }

            handleSuccess("Operation completed successfully.");
        } catch (error) {
            console.error(error);
            handleError(`Operation failed: ${error.message}`);
        } finally {
            setIsResettingPassword(false);
        }
    };

    const roles = ["admin", "manager", "employee", "accountant"];

    return (
        <FormLayout
            title={title}
            onClose={() =>
                handleCloseForm({
                    setFormData,
                    setIsFormVisible: setIsUserFormVisible,
                    setMode,
                })
            }
        >
            <Form>
                <FormRow>
                    <FormInput
                        id="name"
                        label="Name (Workstation name) *"
                        type="text"
                        value={formData.name}
                        handleChange={(val) =>
                            updateFormData(setFormData, "name", val)
                        }
                    />
                </FormRow>
                <FormRow>
                    <FormInput
                        id="email"
                        label="Email *"
                        type="email"
                        value={formData.email}
                        handleChange={(val) =>
                            updateFormData(setFormData, "email", val)
                        }
                        disabled={mode === "create" ? false : true}
                    />
                </FormRow>
                <FormRow>
                    {mode === "create" ? (
                        <FormInput
                            id="password"
                            label="Password *"
                            type="password"
                            value={formData.password}
                            handleChange={(val) =>
                                updateFormData(setFormData, "password", val)
                            }
                        />
                    ) : (
                        <UserFormGroup
                            id="password"
                            label="Password *"
                            isLoading={isResettingPassword}
                            onClick={handlePasswordReset}
                        />
                    )}
                </FormRow>
                <FormRow>
                    <FormInput
                        id="position"
                        label="Position *"
                        type="text"
                        value={formData.position}
                        handleChange={(val) =>
                            updateFormData(setFormData, "position", val)
                        }
                    />
                </FormRow>
                <FormRow>
                    <FormSelect
                        id="role"
                        label="Role Selection *"
                        placeholder="Select a role"
                        value={formData.role}
                        handleChange={(val) => {
                            updateFormData(setFormData, "role", val)
                            if (val === "admin") selectAllAccesses();
                        }}
                        options={roles.map((role) => ({
                            label: role.charAt(0).toUpperCase() + role.slice(1),
                            value: role,
                        }))}
                    />
                </FormRow>
                <FormRow>
                    <CheckboxField
                        id="is_staff"
                        label="Is Staff"
                        checked={formData.is_staff}
                        handleChange={(val) =>
                            updateFormData(setFormData, "is_staff", val)
                        }
                    />
                </FormRow>
                <FormRow>
                    <CheckboxField
                        id="is_active"
                        label="Active Status"
                        checked={formData.is_active}
                        handleChange={(val) =>
                            updateFormData(setFormData, "is_active", val)
                        }
                    />
                </FormRow>
                <FormRow>
                    {accessTabs.map((tab) => {
                        const allChildrenSelected =
                            tab.children.length > 0 &&
                            selectedAccesses[tab.code] &&
                            Object.keys(selectedAccesses[tab.code]).length ===
                            tab.children.length;

                        return (
                            <CheckboxGroup key={tab.id}>
                                <CheckboxField
                                    id={tab.code}
                                    label={`${tab.name.charAt(0).toUpperCase() + tab.name.slice(1)} Access`}
                                    checked={allChildrenSelected}
                                    handleChange={() =>
                                        toggleAllChildren(tab.code, allChildrenSelected)
                                    }
                                    disabled={formData.role === "admin"}
                                    header={true}
                                />

                                {tab.children.map((child) => (
                                    <CheckboxField
                                        key={child.id}
                                        hasMargin={true}
                                        id={child.code}
                                        label={child.name}
                                        checked={
                                            selectedAccesses[tab.code]?.[child.code] || false
                                        }
                                        handleChange={() =>
                                            toggleAccess(child.code, tab.code)
                                        }
                                        disabled={formData.role === "admin"}
                                    />
                                ))}
                            </CheckboxGroup>
                        )
                    })}
                </FormRow>
            </Form>
            <SubmitButton
                isLoading={isLoading}
                onClick={handleSubmit}
            />
        </FormLayout>
    )
}