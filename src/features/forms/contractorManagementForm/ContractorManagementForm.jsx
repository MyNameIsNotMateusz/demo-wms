import { FormLayout } from "../../../components/layout"
import { useState } from "react"
import {
    FormActionsWrapper,
    FormTableWrapper,
} from "../../../components/ui/form/FormBase.styles";
import { TableActionButton } from "../../../components/ui";
import { selectContractors } from "./contractorManagementSelectors";
import { ContractorTable } from "./ContractorTable";
import { useDispatch, useSelector } from "react-redux";
import { handleError, handleSuccess } from "../../../utils/alerts";
import { ContractorForm } from "./ContractorForm";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";
import { useAuth } from "../../../auth/AuthProvider";
import { setProjects, resetProjects } from "./contractorManagementFormSlice"
import { dictionaryThunks } from "../../../store/thunks/dictionaryThunks";
import { validateContractorForm } from "./utils/contractorValidation";
import { handleCloseForm } from "../../../utils/forms/handleCloseForm";
import { getSelectedItem } from "../../../utils/forms/getSelectedItem";

export const ContractorManagementForm = ({ onClose }) => {

    const { accessToken } = useAuth();

    const dispatch = useDispatch();

    const displayedContractors = useSelector(selectContractors);

    const { fetchContractors } = dictionaryThunks;

    const [isLoading, setIsLoading] = useState(false);
    const [selectedContractor, setSelectedContractor] = useState({});
    const [isContractorFormVisible, setIsContractorFormVisible] = useState(false);
    const [contractorFormData, setContractorFormData] = useState({});
    const [mode, setMode] = useState(null);

    const { contractors } = useSelector((state) => state.contractors);
    const { projects } = useSelector((state) => state.contractorManagementForm);

    const handleFetchContractorProjects = async () => {
        const jsonPayload = {
            tax_id: Object.keys(selectedContractor)[0],
        };

        try {
            const response = await fetch(
                `${BASE_API_URL}common/contractors/projects/`,
                {
                    method: "POST",
                    headers: DEFAULT_HEADERS(accessToken),
                    body: JSON.stringify(jsonPayload),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                const backendMessage =
                    errorData?.errors?.join(", ") ||
                    "Error while fetching projects data";
                throw new Error(backendMessage);
            }

            const data = await response.json();
            dispatch(setProjects(data));
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpenContractorForm = (e, mode) => {
        e.preventDefault();

        if (isContractorFormVisible) return;

        if (mode === "edit") {
            const contractor = getSelectedItem({
                selected: selectedContractor,
                collection: contractors,
                keyName: "tax_id",
                errorMessage: "Please select a contractor to edit first.",
                handleError,
            });

            if (!contractor) return;

            setContractorFormData(contractor);
            setMode("edit");
            setIsContractorFormVisible(true);

            handleFetchContractorProjects();
        }

        if (mode === "create") {
            setContractorFormData({
                tax_id: "",
                name: "",
                address: "",
                country: "Polska",
                contractor_type: "",
            });

            setMode("create");
            setIsContractorFormVisible(true);
        }
    };

    const handleCloseContractorForm = () => {
        handleCloseForm({
            setFormData: setContractorFormData,
            setIsFormVisible: setIsContractorFormVisible,
            setMode,
        })
        dispatch(resetProjects());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const isValid = validateContractorForm(
                contractorFormData,
                projects,
                handleError
            );

            if (!isValid) {
                setIsLoading(false);
                return;
            }

            const jsonPayload = {
                ...contractorFormData,
                projects:
                    projects.length > 0
                        ? projects.map((p) => ({
                            project_code: p.project_code,
                        }))
                        : [],
            };

            const response = await fetch(
                `${BASE_API_URL}common/contractors/upsert/`,
                {
                    method: "POST",
                    headers: DEFAULT_HEADERS(accessToken),
                    body: JSON.stringify(jsonPayload),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                const backendMessage =
                    errorData?.errors?.join(", ") || "Failed to create contractor";
                throw new Error(backendMessage);
            }

            setContractorFormData({});
            dispatch(resetProjects());
            handleSuccess("Operation completed successfully.");
            dispatch(fetchContractors(accessToken));
            setSelectedContractor({});
            handleCloseContractorForm();
        } catch (error) {
            console.error("Error while posting contractor:", error);
            handleError("An error occurred while saving contractor.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormLayout
            title="Contractor Management Form"
            onClose={onClose}
            isLoading={isLoading}
            extra={isContractorFormVisible && (
                <ContractorForm
                    title={mode === "create" ? "Add New Contractor" : "Edit Contractor"}
                    onClose={handleCloseContractorForm}
                    isLoading={isLoading}
                    formData={contractorFormData}
                    setFormData={setContractorFormData}
                    handleSubmit={handleSubmit}
                />
            )}
        >
            <FormTableWrapper>
                <ContractorTable
                    data={displayedContractors}
                    selectedRows={selectedContractor}
                    setSelectedRows={setSelectedContractor}
                    isContractorFormVisible={isContractorFormVisible}
                />
            </FormTableWrapper>
            <FormActionsWrapper>
                <TableActionButton
                    handleClick={(e) => handleOpenContractorForm(e, "create")}
                    type="add"
                />
                <TableActionButton
                    handleClick={(e) => handleOpenContractorForm(e, "edit")}
                    type="edit"
                />
            </FormActionsWrapper>
        </FormLayout>
    )
}