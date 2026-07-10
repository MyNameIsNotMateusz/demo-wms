import { useSelector } from "react-redux"
import { ModalLayout } from "../../../components/layout"
import { FormInput } from "../../../components/ui"
import { FormRow, FormTableWrapper } from "../../../components/ui/form/FormBase.styles"
import { updateFormData } from "../../../utils/forms/updateFormData"
import { SearchMaterialsTable } from "./SearchMaterialsTable"
import { selectMaterials } from "./inboundSelectors"

export const SearchMaterialModal = ({
    handleClose,
    handleSubmit,
    modalData,
    setModalData,
    selectedRows,
    setSelectedRows,
}) => {

    const displayedMaterials = useSelector(selectMaterials);

    return (
        <ModalLayout
            title="Search Material"
            handleClose={handleClose}
            handleSubmit={handleSubmit}
        >
            <FormRow>
                <FormInput
                    id="width"
                    label="Width *"
                    type="number"
                    value={modalData.width}
                    handleChange={(val) =>
                        updateFormData(setModalData, "width", val)
                    }
                />
            </FormRow>
            <FormRow>
                <FormInput
                    id="thickness"
                    label="Thickness *"
                    type="number"
                    value={modalData.thickness}
                    handleChange={(val) =>
                        updateFormData(setModalData, "thickness", val)
                    }
                />
            </FormRow>
            <FormRow>
                <FormInput
                    id="metal_type"
                    label="Metal Type"
                    type="text"
                    value={modalData.metal_type}
                    handleChange={(val) =>
                        updateFormData(setModalData, "metal_type", val)
                    }
                />
            </FormRow>
            <FormTableWrapper>
                <SearchMaterialsTable
                    data={displayedMaterials}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                />
            </FormTableWrapper>
        </ModalLayout>
    )
}