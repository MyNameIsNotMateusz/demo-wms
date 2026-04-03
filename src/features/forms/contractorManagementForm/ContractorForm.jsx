import { FormLayout } from "../../../components/layout"
import { updateFormData } from "../../../utils/forms/updateFormData"
import { Form, FormActionsWrapper, FormRow, FormTableWrapper } from "../../../components/ui/form/FormBase.styles";
import { FormInput, FormSelect, SubmitButton, FetchButton, TableActionButton } from "../../../components/ui";
import { useState } from "react";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";
import { useAuth } from "../../../auth/AuthProvider";
import { ProjectsTable } from "./ProjectsTable";
import { selectProjects } from "./contractorManagementSelectors";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addNewProjectRow, removeProjectRow } from "./contractorManagementFormSlice";
import { getNextSelectedProject } from "./utils/projectsTableUtils";
import { handleError } from "../../../utils/alerts";
import { updateProjectRow } from "./contractorManagementFormSlice";
import { findProjectByCode } from "./utils/projectUtils";

export const ContractorForm = ({ title, onClose, isLoading, formData, setFormData, handleSubmit }) => {
    const { accessToken } = useAuth();

    const displayedProjects = useSelector(selectProjects);

    const dispatch = useDispatch();

    const [isFetchingContractor, setIsFetchingContractor] = useState(false);
    const [selectedProjects, setSelectedProjects] = useState({});

    const {
        projectsList
    } = useSelector((state) => state.projects);

    const handleFetchContractor = async (e) => {
        e.preventDefault();

        const jsonPayload = {
            nip: formData.tax_id,
        };

        setIsFetchingContractor(true);

        try {
            const response = await fetch(
                `${BASE_API_URL}common/contractors/gus-fetch/`,
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
                    "Error while fetching contractor data";
                throw new Error(backendMessage);
            }

            const data = await response.json();
            const { tax_id, name, regon, address, legal_form } = data;

            setFormData((prev) => ({
                ...prev,
                tax_id,
                name,
                regon,
                address,
                legal_form,
                contractor_type: "COMPANY",
            }));
        } catch (error) {
            console.error(error);
        } finally {
            setIsFetchingContractor(false);
        }
    };

    const handleAddNewProjectRow = (e) => {
        e.preventDefault();

        const rowId = uuidv4();

        dispatch(addNewProjectRow({ rowId }));
    };

    const handleRemoveProjectRow = (e) => {
        e.preventDefault();

        const selectedKeys = Object.keys(selectedProjects);

        if (selectedKeys.length === 0) {
            handleError("No project selected.");
            return;
        }

        if (selectedKeys.length > 1) {
            dispatch(removeProjectRow(selectedKeys));
            setSelectedProjects({});
            return;
        }

        const selectedKey = selectedKeys[0];

        dispatch(removeProjectRow(selectedKeys));

        const nextKey = getNextSelectedProject(
            displayedProjects,
            selectedKey
        );

        if (nextKey) {
            setSelectedProjects({ [nextKey]: true });
        } else {
            setSelectedProjects({});
        }
    };

    const handleUpdateProject = (rowId, key, value) => {
        dispatch(updateProjectRow({ rowId, key, value }));

        if (value === "") {
            dispatch(updateProjectRow({ rowId, key: "name", value: "" }));
            dispatch(updateProjectRow({ rowId, key: "type", value: "" }));
            return;
        }

        const selectedProject = findProjectByCode(projectsList, value);

        if (selectedProject) {
            dispatch(
                updateProjectRow({
                    rowId,
                    key: "name",
                    value: selectedProject.name,
                })
            );
            dispatch(
                updateProjectRow({
                    rowId,
                    key: "type",
                    value: selectedProject.type,
                })
            );
        }
    };

    const contractorTypes = ["COMPANY", "INDIVIDUAL", "FOREIGN", "SELF"];

    return (
        <FormLayout
            title={title}
            onClose={onClose}
        >
            <Form>
                <FormRow>
                    <FormInput
                        id="tax_id"
                        label="NIP *"
                        type="number"
                        value={formData.tax_id}
                        handleChange={(val) =>
                            updateFormData(setFormData, "tax_id", val)
                        }
                        extra={<FetchButton active={!!formData.tax_id} disabled={isFetchingContractor} onClick={handleFetchContractor} isLoading={isLoading} />}
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
                    <FormInput
                        id="regon"
                        label="REGON"
                        type="number"
                        value={formData.regon}
                        handleChange={(val) =>
                            updateFormData(setFormData, "regon", val)
                        }
                    />
                </FormRow>

                <FormRow>
                    <FormInput
                        id="address"
                        label="Address *"
                        type="text"
                        value={formData.address}
                        handleChange={(val) =>
                            updateFormData(setFormData, "address", val)
                        }
                    />
                    <FormInput
                        id="country"
                        label="Country *"
                        type="text"
                        value={formData.country}
                        handleChange={(val) =>
                            updateFormData(setFormData, "country", val)
                        }
                    />
                    <FormInput
                        id="email"
                        label="Email"
                        type="email"
                        value={formData.email}
                        handleChange={(val) =>
                            updateFormData(setFormData, "email", val)
                        }
                    />
                </FormRow>

                <FormRow>
                    <FormInput
                        id="phone_number"
                        label="Phone Number"
                        type="tel"
                        value={formData.phone_number}
                        handleChange={(val) =>
                            updateFormData(setFormData, "phone_number", val)
                        }
                    />
                    <FormInput
                        id="bank_account"
                        label="Bank Account"
                        type="text"
                        value={formData.bank_account}
                        handleChange={(val) =>
                            updateFormData(setFormData, "bank_account", val)
                        }
                    />
                    <FormInput
                        id="legal_form"
                        label="Legal Form"
                        type="text"
                        value={formData.legal_form}
                        handleChange={(val) =>
                            updateFormData(setFormData, "legal_form", val)
                        }
                    />
                </FormRow>

                <FormRow>
                    <FormSelect
                        id="contractor_type"
                        label="Contractor Type Selection *"
                        placeholder="Select contractor type"
                        value={formData.contractor_type}
                        handleChange={(val) =>
                            updateFormData(setFormData, "contractor_type", val)
                        }
                        options={contractorTypes.map((type) => ({
                            label: type,
                            value: type,
                        }))}
                    />
                </FormRow>
                <FormTableWrapper>
                    <ProjectsTable
                        data={displayedProjects}
                        selectedRows={selectedProjects}
                        setSelectedRows={setSelectedProjects}
                        handleUpdateProject={handleUpdateProject}
                        projects={projectsList}
                    />
                </FormTableWrapper>
                <FormActionsWrapper>
                    <TableActionButton
                        handleClick={(e) => handleAddNewProjectRow(e)}
                        type="add"
                    />
                    <TableActionButton
                        handleClick={(e) => handleRemoveProjectRow(e)}
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