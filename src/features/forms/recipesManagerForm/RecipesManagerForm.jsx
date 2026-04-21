import { FormCard, FormLayout } from "../../../components/layout";
import { useState, useEffect } from "react";
import { FormActionsWrapper, FormCardWrapper, FormRow, FormTableWrapper } from "../../../components/ui/form/FormBase.styles";
import { FormSelect, TableActionButton } from "../../../components/ui";
import { useSelector, useDispatch } from "react-redux";
import { updateFormData } from "../../../utils/forms/updateFormData";
import { setRecipeMaterials, addRecipeMaterial, removeRecipeMaterial } from "./recipesManagerFormSlice";
import { MaterialsTable } from "./MaterialsTable";
import { selectMaterials } from "./recipesManagerSelectors";
import { handleError } from "../../../utils/alerts";

export const RecipesManagerForm = ({ onClose }) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        selected_client: "",
        selected_project: "",
        output_material_code: "",
        process_type: "",
        output_qty: "1.000"
    });

    const displayedMaterials = useSelector((state) =>
        selectMaterials(state, formData.process_type)
    );

    const { recipeMaterials } = useSelector(
        (state) => state.recipesManagerForm,
    );

    const [projects, setProjects] = useState([]);
    const [materials, setMaterials] = useState([]);
    const processes = ["INTERNAL_PRODUCTION", "SERVICE"];
    const [allMaterialCodes, setAllMaterialCodes] = useState([]);
    const [availableMaterialCodes, setAvailableMaterialCodes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMaterials, setSelectedMaterials] = useState({});
    const [editedValues, setEditedValues] = useState({});

    useEffect(() => {
        dispatch(setRecipeMaterials([]));
    }, [dispatch]);

    useEffect(() => {
        if (!materials?.length) {
            setAllMaterialCodes([]);
            return;
        }

        const codes = materials.filter(
            (m) =>
                m.material_code !== formData.output_material_code &&
                m.type === "WIP"
        );

        setAllMaterialCodes(codes);
    }, [materials, formData.output_material_code]);

    useEffect(() => {
        if (formData.process_type === "") {
            setAvailableMaterialCodes([]);
            return;
        }

        const currentProcessData = recipeMaterials.find(
            (item) => item.process === formData.process_type
        );

        if (!currentProcessData) {
            setAvailableMaterialCodes(allMaterialCodes);
            return;
        }

        const forbiddenCodes = currentProcessData.inputs.map(
            (input) => input.material_code
        );

        const filteredCodes = allMaterialCodes.filter(
            (code) => !forbiddenCodes.includes(code.material_code)
        );

        setAvailableMaterialCodes(filteredCodes);
    }, [formData.process_type, recipeMaterials, allMaterialCodes]);


    const {
        clients,
    } = useSelector((state) => state.recipes.recipes);

    const handleContractorChange = (val) => {
        setFormData((prev) => ({
            ...prev,
            selected_client: val,
            selected_project: "",
            output_material_code: "",
            process_type: ""
        }));

        const selectedClient = clients.find((c) => c.name === val);

        if (selectedClient) {
            setProjects(selectedClient.projects || []);
        } else {
            setProjects([]);
        }
    };

    const handleProjectChange = (val) => {
        setFormData((prev) => ({
            ...prev,
            selected_project: val,
            process_type: "",
            output_material_code: "",
        }));

        const selectedProject = projects.find((p) => p.name === val)

        if (selectedProject) {
            console.log(selectedProject.materials);
            setMaterials(selectedProject.materials || []);
        } else {
            setMaterials([]);
        }
    };

    const handleMaterialChange = (val) => {
        const selectedMaterial = materials.find(
            (m) => m.material_code === val
        );

        const recipes = selectedMaterial?.recipes || [];

        dispatch(setRecipeMaterials(recipes));

        setFormData((prev) => ({
            ...prev,
            output_material_code: val,
            process_type: recipes[0]?.process || "",
        }));
    };

    const handleAddMaterial = () => {
        if (formData.process_type === "") {
            handleError(
                "No process selected. Please select a process before adding a material."
            );
            return;
        }

        if (availableMaterialCodes.length === 0) {
            handleError(
                "There are no available material codes left to add to this process."
            );
            return;
        }

        const materialCode = availableMaterialCodes[0];

        dispatch(
            addRecipeMaterial({
                material_code: materialCode.material_code,
                type: materialCode.type,
                selectedProcess: formData.process_type,
            })
        );
    };

    const handleRemoveMaterial = () => {
        const selectedKeys = Object.keys(selectedMaterials);

        if (selectedKeys.length === 0) return;

        const id = selectedKeys[0];

        dispatch(
            removeRecipeMaterial({
                ids: selectedKeys,
                selectedProcess: formData.process_type,
            })
        );

        if (selectedKeys.length === 1) {
            const indexToRemove = displayedMaterials.findIndex(
                (item) => item.material_code === id
            );

            const nextItem =
                displayedMaterials[indexToRemove + 1] ||
                displayedMaterials[indexToRemove - 1];

            if (nextItem) {
                setSelectedMaterials({ [nextItem.material_code]: true });
                return;
            }
        }

        setSelectedMaterials({});
    };

    return (
        <FormLayout
            title="Recipes Manager Form"
            onClose={onClose}
            isLoading={isLoading}
        >
            <FormCardWrapper>
                <FormCard
                    title="Required"
                >
                    <FormRow>
                        <FormSelect
                            id="contractor"
                            label="Contractor Selection *"
                            placeholder="Select a Contractor"
                            value={formData.selected_client}
                            handleChange={(val) => {
                                handleContractorChange(val);
                            }}
                            options={clients.map((c) => ({
                                label: c.name,
                                value: c.name,
                            }))}
                        />
                    </FormRow>
                    <FormRow>
                        <FormSelect
                            id="project"
                            label="Project Selection *"
                            placeholder="Select a project"
                            value={formData.selected_project}
                            handleChange={(val) => {
                                handleProjectChange(val);
                            }}
                            options={projects.map((p) => ({
                                label: p.name,
                                value: p.name,
                            }))}
                        />
                    </FormRow>
                    <FormRow>
                        <FormSelect
                            id="material_code"
                            label="Material Code *"
                            placeholder="Select a material code"
                            value={formData.output_material_code}
                            handleChange={(val) => {
                                handleMaterialChange(val)
                            }}
                            options={materials.map((m) => ({
                                label: m.material_code,
                                value: m.material_code,
                            }))}
                        />
                    </FormRow>
                    <FormRow>
                        <FormSelect
                            id="process"
                            label="Process *"
                            placeholder="Select a process"
                            value={formData.process_type}
                            handleChange={(val) => {
                                updateFormData(setFormData, "process_type", val)
                            }}
                            options={processes.map((process) => ({
                                label: process,
                                value: process,
                            }))}
                            isDisabled={!formData.output_material_code}
                        />
                    </FormRow>
                    <FormTableWrapper>
                        <MaterialsTable
                            data={displayedMaterials}
                            selectedRows={selectedMaterials}
                            setSelectedRows={setSelectedMaterials}
                            availableMaterialCodes={availableMaterialCodes}
                            materials={materials}
                            selectedProcess={formData.process_type}
                            editedValues={editedValues}
                            setEditedValues={setEditedValues}
                        />
                    </FormTableWrapper>
                    <FormActionsWrapper>
                        <TableActionButton
                            handleClick={handleAddMaterial}
                            type="add"
                        />
                        <TableActionButton
                            handleClick={handleRemoveMaterial}
                            type="remove"
                        />
                    </FormActionsWrapper>
                </FormCard>
                <FormCard>
                </FormCard>
            </FormCardWrapper>
        </FormLayout>
    )
};