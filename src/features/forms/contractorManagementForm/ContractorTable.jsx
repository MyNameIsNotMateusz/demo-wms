import { FormTable } from "../../../components/layout";
import { contractorColumns } from "./contractorManagementTableConfig";
import { setContractorFilters, setContractorSortConfig } from "./contractorManagementFormSlice";
import { useSelector } from "react-redux";
import {
    TableBodyCell,
    TableBodyRow,
} from "../../../components/ui/table/TableBase.styles";
import { handleRowClick } from "../../../utils/table/tableRowSelection";

export const ContractorTable = ({
    data,
    selectedRows,
    setSelectedRows,
    isContractorFormVisible
}) => {
    const { contractorSortConfig, contractorFilters } = useSelector(
        (state) => state.contractorManagementForm,
    );

    return (
        <FormTable
            tableOrigin="contractor"
            columns={contractorColumns}
            sortConfig={contractorSortConfig}
            setSortConfig={setContractorSortConfig}
            filters={contractorFilters}
            setFilters={setContractorFilters}
            showSelectAll={false}
        >
            {data.map((row, index) => (
                <TableBodyRow
                    key={index}
                    onClick={(e) => {
                        if (e.target.tagName.toLowerCase() === "input" || isContractorFormVisible) return;
                        handleRowClick(row.tax_id, setSelectedRows, false);
                    }}
                >
                    <TableBodyCell>
                        <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={selectedRows[row.tax_id] || false}
                            onChange={() => {
                                if (isContractorFormVisible) return;
                                handleRowClick(row.tax_id, setSelectedRows, false);
                            }}
                        />
                    </TableBodyCell>

                    <TableBodyCell>{row.name}</TableBodyCell>
                    <TableBodyCell>{row.tax_id}</TableBodyCell>
                    <TableBodyCell>{row.address}</TableBodyCell>
                    <TableBodyCell>{row.legal_form}</TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    );
};
