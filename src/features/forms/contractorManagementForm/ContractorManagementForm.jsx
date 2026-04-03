import { FormLayout } from "../../../components/layout"
import { useState } from "react"
import {
    FormActionsWrapper,
    FormTableWrapper,
} from "../../../components/ui/form/FormBase.styles";
import { TableActionButton } from "../../../components/ui";
import { selectContractors } from "./contractorManagementSelectors";
import { ContractorTable } from "./ContractorTable";
import { useSelector } from "react-redux";
import { handleError } from "../../../utils/alerts";

export const ContractorManagementForm = ({ onClose }) => {

    const displayedContractors = useSelector(selectContractors);

    const [isLoading, setIsLoading] = useState(false);
    const [selectedContractor, setSelectedContractor] = useState({});
    const [isContractorFormVisible, setIsContractorFormVisible] = useState(false);
    const [contractorFormData, setContractorFormData] = useState({});
    const [mode, setMode] = useState(null);

    const { contractors } = useSelector((state) => state.contractors);

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

    return (
        <FormLayout
            title="Contractor Management Form"
            onClose={onClose}
            isLoading={isLoading}
            extra=""
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