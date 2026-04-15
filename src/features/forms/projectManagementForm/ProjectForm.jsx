import { FormLayout } from "../../../components/layout"
import { Form, FormRow, FormTableWrapper, FormActionsWrapper } from "../../../components/ui/form/FormBase.styles"
import { handleCloseForm } from "../../../utils/forms/handleCloseForm"
import { FormInput, FormSelect, CheckboxField, SubmitButton, TableActionButton } from "../../../components/ui"
import { updateFormData } from "../../../utils/forms/updateFormData"
import { MaterialsTable } from "./MaterialsTable"
import { useSelector, useDispatch } from "react-redux"
import { selectMaterials } from "./projectManagementSelectors"
import { useState } from "react"
import { updateMaterialRow, addNewMaterialRow, removeMaterialRow } from "./projectManagementFormSlice"
import { v4 as uuidv4 } from "uuid";
import { handleError } from "../../../utils/alerts";
import { getNextSelectedMaterial } from "./utils/materialsTableUtils"

export const ProjectForm = ({ title, setFormData, setIsProjectFormVisible, setMode, formData, isLoading, handleSubmit }) => {

    const displayedMaterials = useSelector(selectMaterials);

    const dispatch = useDispatch();

    const {
        materials
    } = useSelector((state) => state.materials);

    const [selectedMaterials, setSelectedMaterials] = useState({})

    const handleUpdateMaterial = (rowId, key, value) => {
        dispatch(updateMaterialRow({ rowId, key, value }));

        if (value === "") {
            dispatch(updateMaterialRow({ rowId, key: "name", value: "" }));
            dispatch(updateMaterialRow({ rowId, key: "type", value: "" }));
            return;
        }

        const selectedMaterial = materials.find((mat) => mat.code === value);

        if (selectedMaterial) {
            dispatch(
                updateMaterialRow({
                    rowId,
                    key: "name",
                    value: selectedMaterial.name,
                })
            );
            dispatch(
                updateMaterialRow({
                    rowId,
                    key: "type",
                    value: selectedMaterial.type,
                })
            );
        }
    };

    const handleAddNewMaterialRow = (e) => {
        e.preventDefault();

        const rowId = uuidv4();

        dispatch(addNewMaterialRow({ rowId }));
    };

    const handleRemoveMaterialRow = (e) => {
        e.preventDefault();

        const selectedKeys = Object.keys(selectedMaterials);

        if (selectedKeys.length === 0) {
            handleError("No material selected.");
            return;
        }

        if (selectedKeys.length > 1) {
            dispatch(removeMaterialRow(selectedKeys));
            setSelectedMaterials({});
            return;
        }

        const selectedKey = selectedKeys[0];

        dispatch(removeMaterialRow(selectedKeys));

        const nextKey = getNextSelectedMaterial(
            displayedMaterials,
            selectedKey
        );

        if (nextKey) {
            setSelectedMaterials({ [nextKey]: true });
        } else {
            setSelectedMaterials({});
        }
    };

    return (
        <FormLayout
            title={title}
            onClose={() =>
                handleCloseForm({
                    setFormData,
                    setIsFormVisible: setIsProjectFormVisible,
                    setMode
                })
            }
        >
            <Form>
                <FormRow>
                    <FormInput
                        id="code"
                        label="Project Code *"
                        type="text"
                        value={formData.code}
                        handleChange={(val) =>
                            updateFormData(setFormData, "code", val)
                        }
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
                    <FormSelect
                        id="type"
                        label="Type Selection *"
                        placeholder="Select a type"
                        value={formData.type}
                        handleChange={(val) => {
                            updateFormData(setFormData, "type", val)
                        }}
                        options={[
                            { label: "Sales", value: "SALES" },
                            { label: "Material Supplier", value: "SUPPLIER" },
                            { label: "Service", value: "SERVICE" },
                        ]}
                    />
                </FormRow>
                <FormRow>
                    <FormInput
                        id="start_date"
                        label="Start Date *"
                        type="date"
                        value={formData.start_date}
                        handleChange={(val) =>
                            updateFormData(setFormData, "start_date", val)
                        }
                    />
                    <FormInput
                        id="end_date"
                        label="End Date"
                        type="date"
                        value={formData.end_date}
                        handleChange={(val) =>
                            updateFormData(setFormData, "end_date", val)
                        }
                    />
                    <CheckboxField
                        id="is_active"
                        label="Is Active"
                        checked={formData.is_active}
                        handleChange={(val) =>
                            updateFormData(setFormData, "is_active", val)
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
                <FormTableWrapper>
                    <MaterialsTable
                        data={displayedMaterials}
                        selectedRows={selectedMaterials}
                        setSelectedRows={setSelectedMaterials}
                        materials={materials}
                        handleUpdateMaterial={handleUpdateMaterial}
                    />
                </FormTableWrapper>
                <FormActionsWrapper>
                    <TableActionButton
                        handleClick={(e) => handleAddNewMaterialRow(e)}
                        type="add"
                    />
                    <TableActionButton
                        handleClick={(e) => handleRemoveMaterialRow(e)}
                        type="remove"
                    />
                </FormActionsWrapper>
            </Form>
            <SubmitButton
                isLoading={isLoading}
                onClick={handleSubmit}
            />
        </FormLayout>
    )
}