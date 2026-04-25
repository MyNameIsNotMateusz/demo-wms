import { FormCard, FormLayout } from "../../../components/layout";
import { useState, useEffect } from "react";
import { FormActionsWrapper, FormCardWrapper, FormRow, FormTableWrapper } from "../../../components/ui/form/FormBase.styles";
import { FormSelect, TableActionButton, SubmitButton } from "../../../components/ui";
import { useSelector, useDispatch } from "react-redux";
import { updateFormData } from "../../../utils/forms/updateFormData";
import { setRecipeMaterials, addRecipeMaterial, removeRecipeMaterial, resetRecipeMaterialsState } from "./recipesManagerFormSlice";
import { MaterialsTable } from "./MaterialsTable";
import { selectMaterials } from "./recipesManagerSelectors";
import { handleError, handleSuccess } from "../../../utils/alerts";
import { AlternativeGroups } from "./components/AlternativeGroups";
import { handleRemoveMaterial } from "./utils/handleRemoveMaterial";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";
import { useAuth } from "../../../auth/AuthProvider";
import { dictionaryThunks } from "../../../store/thunks/dictionaryThunks";
import { validateRecipe } from "./utils/validateRecipe";
import { buildRecipePayload } from "./utils/buildRecipePayload";

export const RecipesManagerForm = ({ onClose }) => {

    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        selected_client: "",
        selected_project: "",
        output_material_code: "",
        process_type: "",
        output_qty: "1.000"
    });
    const [hasChanges, setHasChanges] = useState(false);

    const displayedMaterials = useSelector((state) =>
        selectMaterials(state, formData.process_type)
    );

    const { fetchRecipes } = dictionaryThunks;

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
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState("");
    const [activeAlternativeRow, setActiveAlternativeRow] = useState({});

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

    useEffect(() => {
        if (!formData.output_material_code) {
            setGroups([]);
            return;
        }

        const processToUpdate = recipeMaterials.find(
            (item) => item.process === formData.process_type
        );

        if (!processToUpdate) {
            setGroups([]);
            return;
        }

        const alternativeGroups = Array.from(
            new Set(
                processToUpdate.inputs
                    .map((input) => input.alternative_group)
                    .filter((group) => group !== null)
                    .map((group) => Number(group))
            )
        );

        setGroups(alternativeGroups.map((group) => ({ group })));
        setActiveAlternativeRow({});
    }, [formData.output_material_code, formData.process_type]);


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
        setHasChanges(true);
    };

    const handleAddGroup = () => {
        if (formData.process_type === "") {
            handleError(
                "No process selected. Please select a process before adding a group."
            );
            return;
        }

        const nextGroupNumber =
            groups.length > 0 ? Math.max(...groups.map((g) => g.group)) + 1 : 1;

        setGroups([...groups, { group: nextGroupNumber }]);
    };

    const handleRemoveGroup = () => {
        if (!selectedGroup) {
            handleError("No group selected");
            return;
        }

        const indexToRemove = groups.findIndex(
            (g) => g.group.toString() === selectedGroup
        );

        const nextGroup =
            groups[indexToRemove + 1]?.group.toString() ||
            groups[indexToRemove - 1]?.group.toString();

        const processToUpdate = recipeMaterials.find(
            (item) => item.process === formData.process_type
        );

        if (processToUpdate) {
            const materialCodesToRemove = processToUpdate.inputs
                .filter(
                    (input) =>
                        String(input.alternative_group) === selectedGroup
                )
                .map((input) => input.material_code);

            if (materialCodesToRemove.length > 0) {
                dispatch(
                    removeRecipeMaterial({
                        ids: materialCodesToRemove,
                        selectedProcess: formData.process_type,
                    })
                );
            }
        }

        setGroups(
            groups.filter((g) => g.group.toString() !== selectedGroup)
        );

        setSelectedGroup(nextGroup || "");
        setActiveAlternativeRow({});
    };

    const handleSelectGroup = (groupNumber) => {
        setSelectedGroup(
            selectedGroup === groupNumber.toString() ? "" : groupNumber.toString(),
        );
    };

    const handleAddAlternativeMaterial = (groupNumber) => {
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
                alternative_group: groupNumber,
            })
        );
        setHasChanges(true);
    };

    const handleSubmit = async () => {
        if (!hasChanges) {
            handleError("No changes have been made.");
            return;
        }

        const error = validateRecipe({
            formData,
            materials,
            recipeMaterials,
        });

        if (error) {
            handleError(error);
            return;
        }

        const payload = buildRecipePayload({
            formData,
            recipeMaterials,
        });

        setIsLoading(true);

        try {
            const response = await fetch(
                `${BASE_API_URL}common/recipes/upsert/`,
                {
                    method: "POST",
                    headers: DEFAULT_HEADERS(accessToken),
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                const backendMessage =
                    errorData?.errors?.join(", ") ||
                    "Error while fetching projects data";
                throw new Error(backendMessage);
            }

            handleSuccess("Operation completed successfully.");

            setActiveAlternativeRow({});
            setGroups([]);
            setSelectedGroup("");
            setFormData({
                selected_client: "",
                selected_project: "",
                output_material_code: "",
                process_type: "",
                output_qty: "1.000",
            });
            setMaterials([]);
            setHasChanges(false);

            dispatch(resetRecipeMaterialsState());
            dispatch(fetchRecipes(accessToken));
        } catch (error) {
            console.error("Error while posting recipes:", error);
            handleError("An error occurred while saving recipes.");
        } finally {
            setIsLoading(false);
        }
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
                                handleMaterialChange(val);
                                setHasChanges(false);
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
                                updateFormData(setFormData, "process_type", val);
                                setHasChanges(true);
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
                            setHasChanges={setHasChanges}
                        />
                    </FormTableWrapper>
                    <FormActionsWrapper>
                        <TableActionButton
                            handleClick={handleAddMaterial}
                            type="add"
                        />
                        <TableActionButton
                            handleClick={() => handleRemoveMaterial({
                                selectedMaterials,
                                data: displayedMaterials,
                                dispatch,
                                selectedProcess: formData.process_type,
                                setSelectedMaterials,
                                setHasChanges
                            })}
                            type="remove"
                        />
                    </FormActionsWrapper>
                    <SubmitButton
                        isLoading={isLoading}
                        onClick={handleSubmit}
                    />
                </FormCard>
                <FormCard title="Alternatives">
                    <AlternativeGroups
                        groups={groups}
                        selectedGroup={selectedGroup}
                        handleSelectGroup={handleSelectGroup}
                        handleAddAlternativeMaterial={handleAddAlternativeMaterial}
                        recipeMaterials={recipeMaterials}
                        selectedProcess={formData.process_type}
                        activeAlternativeRow={activeAlternativeRow}
                        setActiveAlternativeRow={setActiveAlternativeRow}
                        materials={materials}
                        availableMaterialCodes={availableMaterialCodes}
                        setHasChanges={setHasChanges}
                    />
                    <FormActionsWrapper>
                        <TableActionButton
                            handleClick={handleAddGroup}
                            type="add"
                        />
                        <TableActionButton
                            handleClick={handleRemoveGroup}
                            type="remove"
                        />
                    </FormActionsWrapper>
                </FormCard>
            </FormCardWrapper>
        </FormLayout>
    )
};