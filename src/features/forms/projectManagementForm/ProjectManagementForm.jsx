import { FormLayout } from "../../../components/layout"
import { useState } from "react";
import { FormActionsWrapper, FormTableWrapper } from "../../../components/ui/form/FormBase.styles";
import { ProjectTable } from "./ProjectTable";
import { useSelector, useDispatch } from "react-redux";
import { selectProjects } from "./projectManagementSelectors";
import { TableActionButton } from "../../../components/ui";
import { handleError, handleSuccess } from "../../../utils/alerts";
import { v4 as uuidv4 } from "uuid";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";
import { setMaterialsTable, resetMaterialsTable } from "./projectManagementFormSlice";
import { fetchProjectMaterials } from "./utils/fetchProjectMaterials";
import { useAuth } from "../../../auth/AuthProvider";
import { getSelectedItem } from "../../../utils/forms/getSelectedItem";
import { ProjectForm } from "./ProjectForm";
import { dictionaryThunks } from "../../../store/thunks/dictionaryThunks";
import { handleCloseForm } from "../../../utils/forms/handleCloseForm";
import { validateProjectForm } from "./utils/projectValidation";

export const ProjectManagementForm = ({ onClose }) => {

    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const displayedProjects = useSelector(selectProjects);

    const { fetchProjects } = dictionaryThunks;

    const [isLoading, setIsLoading] = useState(false);
    const [selectedProject, setSelectedProject] = useState({});
    const [isProjectFormVisible, setIsProjectFormVisible] = useState(false);
    const [mode, setMode] = useState(null);
    const [projectFormData, setProjectFormData] = useState({});

    const { projectsList } = useSelector((state) => state.projects);
    const { materialsTable } = useSelector((state) => state.projectManagementForm);

    const handleOpenProjectForm = (e, mode) => {
        e.preventDefault();

        if (isProjectFormVisible) return;

        if (mode === "edit") {
            const project = getSelectedItem({
                selected: selectedProject,
                collection: projectsList,
                keyName: "code",
                errorMessage: "Please select a project to edit first.",
                handleError,
            });

            if (!project) return;

            const { created_at, ...cleanedProject } = project;

            setProjectFormData(cleanedProject);
            setMode("edit");

            fetchProjectMaterials({
                projectCode: project.code,
                BASE_API_URL,
                DEFAULT_HEADERS,
                accessToken,
                dispatch,
                setMaterialsTable,
                handleError,
            });
            setIsProjectFormVisible(true);
        }

        if (mode === "create") {
            setProjectFormData({
                id: uuidv4(),
                code: "",
                name: "",
                type: "",
                is_active: true,
                start_date: "",
            });

            setMode("create");
            setIsProjectFormVisible(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const isValid = validateProjectForm(
                projectFormData,
                materialsTable,
                handleError
            );

            if (!isValid) {
                setIsLoading(false);
                return;
            }

            const { id, ...cleanedProject } = projectFormData;

            const cleanedMaterials = materialsTable.map((mat) => ({
                material_code: mat.material_code,
            }));

            const jsonPayload = {
                ...cleanedProject,
                materials: cleanedMaterials,
            };

            if (jsonPayload.is_active === false) {
                jsonPayload.materials = [];
            }

            const response = await fetch(
                `${BASE_API_URL}common/projects/upsert/`,
                {
                    method: "POST",
                    headers: DEFAULT_HEADERS(accessToken),
                    body: JSON.stringify(jsonPayload),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                const backendMessage =
                    errorData?.errors?.join(", ") || "Failed to create project";
                throw new Error(backendMessage);
            }

            handleSuccess("Operation completed successfully.");
            dispatch(fetchProjects());

            handleCloseForm({
                setFormData: setProjectFormData,
                setIsFormVisible: setIsProjectFormVisible,
                setMode,
            });

            setSelectedProject({});
            dispatch(resetMaterialsTable());
        } catch (error) {
            console.error("Error while posting project:", error);
            handleError("An error occurred while saving project.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormLayout
            title="Project Management Form"
            onClose={onClose}
            isLoading={isLoading}
            extra={isProjectFormVisible && (
                <ProjectForm
                    title={mode === "create" ? "Add New Project" : "Edit Project"}
                    setFormData={setProjectFormData}
                    setIsProjectFormVisible={setIsProjectFormVisible}
                    setMode={setMode}
                    formData={projectFormData}
                    isLoading={isLoading}
                    handleSubmit={handleSubmit}
                />
            )}
        >
            <FormTableWrapper>
                <ProjectTable
                    data={displayedProjects}
                    selectedRows={selectedProject}
                    setSelectedRows={setSelectedProject}
                    isProjectFormVisible={isProjectFormVisible}
                />
            </FormTableWrapper>
            <FormActionsWrapper>
                <TableActionButton
                    handleClick={(e) => handleOpenProjectForm(e, "create")}
                    type="add"
                />
                <TableActionButton
                    handleClick={(e) => handleOpenProjectForm(e, "edit")}
                    type="edit"
                />
            </FormActionsWrapper>
        </FormLayout>
    )
}