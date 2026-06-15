import { ModalLayout } from "../../../components/layout"
import { FormInput, ReadOnlyField } from "../../../components/ui"
import { FormRow } from "../../../components/ui/form/FormBase.styles"
import { updateFormData } from "../../../utils/forms/updateFormData"

export const ReturnCoilModal = ({
    handleClose,
    handleSubmit,
    modalData,
    setModalData
}) => {
    return (
        <ModalLayout
            title="Return Details"
            handleClose={handleClose}
            handleSubmit={handleSubmit}
        >
            <FormRow>
                <ReadOnlyField
                    label="Coil ID"
                    value={modalData.coil_id}
                />
            </FormRow>
            <FormRow>
                <ReadOnlyField
                    label="Weight"
                    value={modalData.weight}
                />
            </FormRow>
            <FormRow>
                <FormInput
                    id="returned_weight"
                    label="Returned Weight *"
                    type="number"
                    value={modalData.returned_weight}
                    handleChange={(val) =>
                        updateFormData(setModalData, "returned_weight", val)
                    }
                />
            </FormRow>
            <FormRow>
                <FormInput
                    id="operator_name"
                    label="Operator Name"
                    type="text"
                    value={modalData.operator_name}
                    handleChange={(val) =>
                        updateFormData(setModalData, "operator_name", val)
                    }
                />
            </FormRow>
            <FormRow>
                <FormInput
                    id="remarks"
                    label="Remarks"
                    type="text"
                    value={modalData.remarks}
                    handleChange={(val) =>
                        updateFormData(setModalData, "remarks", val)
                    }
                />
            </FormRow>
        </ModalLayout>
    )
}