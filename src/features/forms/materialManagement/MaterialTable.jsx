import { FormTable } from "../../../components/layout";
import { materialColumns } from "./materialManagementTableConfig";
import { setMaterialSortConfig, setMaterialFilters } from "./materialManagementFormSlice";
import { useSelector } from "react-redux";
import {
    TableBodyCell,
    TableBodyRow,
} from "../../../components/ui/table/TableBase.styles";
import { handleRowClick } from "../../../utils/table/tableRowSelection";

export const MaterialTable = ({
    data,
    selectedRows,
    setSelectedRows,
    isMaterialFormVisible
}) => {
    const { materialSortConfig, materialFilters } = useSelector(
        (state) => state.materialManagementForm,
    );

    return (
        <FormTable
            tableOrigin="material"
            columns={materialColumns}
            sortConfig={materialSortConfig}
            setSortConfig={setMaterialSortConfig}
            filters={materialFilters}
            setFilters={setMaterialFilters}
            showSelectAll={false}
        >
            {data.map((row, index) => (
                <TableBodyRow
                    key={index}
                    onClick={(e) => {
                        if (e.target.tagName.toLowerCase() === "input" || isMaterialFormVisible) return;
                        handleRowClick(row.id, setSelectedRows, false);
                    }}
                >
                    <TableBodyCell>
                        <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={selectedRows[row.id] || false}
                            onChange={() => {
                                if (isMaterialFormVisible) return;
                                handleRowClick(row.id, setSelectedRows, false);
                            }}
                        />
                    </TableBodyCell>

                    <TableBodyCell>{row.code}</TableBodyCell>
                    <TableBodyCell>{row.seq_number}</TableBodyCell>
                    <TableBodyCell>{row.name}</TableBodyCell>
                    <TableBodyCell>{row.type}</TableBodyCell>
                    <TableBodyCell>{row.destination}</TableBodyCell>
                    <TableBodyCell>{row.is_simplified ? "True" : "False"}</TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    );
};
