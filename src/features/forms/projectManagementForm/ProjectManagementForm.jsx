import { FormLayout } from "../../../components/layout"
import { useState } from "react";
import { FormActionsWrapper, FormTableWrapper } from "../../../components/ui/form/FormBase.styles";
import { ProjectTable } from "./ProjectTable";
import { useSelector, useDispatch } from "react-redux";
import { selectProjects } from "./projectManagementSelectors";
import { TableActionButton } from "../../../components/ui";
import { handleError } from "../../../utils/alerts";
import { v4 as uuidv4 } from "uuid";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";
import { setMaterialsTable } from "./projectManagementFormSlice";
import { fetchProjectMaterials } from "./utils/fetchProjectMaterials";
import { useAuth } from "../../../auth/AuthProvider";
import { getSelectedItem } from "../../../utils/forms/getSelectedItem";

export const ProjectManagementForm = ({ onClose }) => {

    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const displayedProjects = useSelector(selectProjects);

    const [isLoading, setIsLoading] = useState(false);
    const [selectedProject, setSelectedProject] = useState({});
    const [isProjectFormVisible, setIsProjectFormVisible] = useState(false);
    const [mode, setMode] = useState(null);
    const [projectFormData, setProjectFormData] = useState({});

    const { projectsList } = useSelector((state) => state.projects);

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

            setProjectFormData(project);
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

    return (
        <FormLayout
            title="Project Management Form"
            onClose={onClose}
            isLoading={isLoading}
            extra=""
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