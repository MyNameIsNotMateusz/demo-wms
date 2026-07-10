import { useSelector } from "react-redux"
import { FormTable } from "../../../components/layout";
import { materialsColumns } from "./inboundTableConfig";
import { setMaterialsSortConfig, setMaterialsFilters } from "./inboundFormSlice";
import { TableBodyCell, TableBodyRow } from "../../../components/ui/table/TableBase.styles";
import { handleRowClick } from "../../../utils/table/tableRowSelection";

export const SearchMaterialsTable = ({
    data,
    selectedRows,
    setSelectedRows
}) => {
    const { materialsSortConfig, materialsFilters } = useSelector((state) => state.inboundForm);

    return (
        <FormTable
            tableOrigin="searchMaterials"
            columns={materialsColumns}
            rows={data}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            getRowId={(row) => row.code}
            sortConfig={materialsSortConfig}
            setSortConfig={setMaterialsSortConfig}
            filters={materialsFilters}
            setFilters={setMaterialsFilters}
        >
            {data.map((row, index) => (
                <TableBodyRow
                    key={index}
                    onClick={(e) => {
                        if (e.target.tagName.toLowerCase() === "input") return;
                        handleRowClick(row.code, setSelectedRows);
                    }}
                >
                    <TableBodyCell $isFirstChild>
                        <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={selectedRows[row.code] || false}
                            onChange={() => {
                                handleRowClick(row.code, setSelectedRows);
                            }}
                        />
                    </TableBodyCell>
                    <TableBodyCell>{row.code}</TableBodyCell>
                    <TableBodyCell>{Number(row.width)}</TableBodyCell>
                    <TableBodyCell>{Number(row.thickness)}</TableBodyCell>
                    <TableBodyCell>{row.metal_type}</TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    )
}