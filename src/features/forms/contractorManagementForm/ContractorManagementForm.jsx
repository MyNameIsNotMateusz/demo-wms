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
            if (!selectedContractor || Object.keys(selectedContractor).length === 0) {
                handleError("Please select a contractor to edit first.");
                return;
            }

            const selectedNIP = Object.keys(selectedContractor)[0];
            const contractor = contractors.find(
                (c) => c.tax_id === selectedNIP
            );

            if (!contractor) {
                handleError("Contractor not found.");
                return;
            }

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
        setContractorFormData({});
        setIsContractorFormVisible(false);
        setMode(null);
        dispatch(resetProjects());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            tax_id,
            name,
            address,
            country,
            contractor_type,
            regon,
            legal_form,
        } = contractorFormData;

        if (!tax_id || !name || !address || !country || !contractor_type) {
            handleError("Please fill all required fields.");
            return;
        }

        if (regon) {
            if (regon.length < 9 || regon.length > 14) {
                handleError("REGON must have between 9 and 14 characters.");
                return;
            }
        }

        if (contractor_type === "COMPANY" && legal_form == undefined) {
            handleError(
                "For a contractor of type COMPANY, the legal form must be specified."
            );
            return;
        }

        if (projects.length > 0) {
            const hasEmptyProjectCode = projects.some((p) => !p.project_code);

            if (hasEmptyProjectCode) {
                handleError("Not all projects have selected Project Code.");
                return;
            }

            const codes = projects.map((p) => p.project_code);
            const hasDuplicates = new Set(codes).size !== codes.length;

            if (hasDuplicates) {
                handleError("Project Code cannot be duplicated.");
                return;
            }
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

        setIsLoading(true);

        try {
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
                    errorData?.errors?.join(", ") ||
                    "Failed to create contractor";
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