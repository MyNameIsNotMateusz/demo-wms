import { ModalLayout } from "../../../components/layout"
import { FormInput } from "../../../components/ui"
import { FormRow } from "../../../components/ui/form/FormBase.styles"
import { updateFormData } from "../../../utils/forms/updateFormData"

export const AddRowsModal = ({ handleClose, handleSubmit, modalData, setModalData }) => {
    return (
        <ModalLayout
            title="Add Multiple Rows"
            handleClose={handleClose}
            handleSubmit={handleSubmit}
        >
            <FormRow>
                <FormInput
                    id="rows"
                    label="Number of rows *"
                    type="number"
                    value={modalData.rows}
                    handleChange={(val) =>
                        updateFormData(setModalData, "rows", val)
                    }
                />
            </FormRow>
            <FormRow>
                <FormInput
                    id="quantity"
                    label="Quantity *"
                    type="number"
                    value={modalData.quantity}
                    handleChange={(val) =>
                        updateFormData(setModalData, "quantity", val)
                    }
                />
            </FormRow>
        </ModalLayout>
    )
}