import { FormLayout } from "../../../components/layout"
import { updateFormData } from "../../../utils/forms/updateFormData"
import { Form, FormRow } from "../../../components/ui/form/FormBase.styles";
import { FormInput } from "../../../components/ui";

export const UserForm = ({ title, onClose, formData, setFormData }) => {
    return (
        <FormLayout
            title={title}
            onClose={onClose}
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
            </Form>
        </FormLayout>
    )
}