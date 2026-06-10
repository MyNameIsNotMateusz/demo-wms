import { FormTable } from "../../../components/layout"
import { printedCoilColumns } from "./coilLabelsTableConfig"
import { setCoilsFilters, setCoilsSortConfig } from "./coilLabelsFormSlice"
import { useSelector } from "react-redux"
import { TableBodyCell, TableBodyRow } from "../../../components/ui/table/TableBase.styles"
import { handleRowClick } from "../../../utils/table/tableRowSelection"

export const CoilsTable = ({
    data,
    selectedRows,
    setSelectedRows
}) => {

    const { printedCoilsSortConfig, printedCoilsFilters } = useSelector((state) => state.coilLabelsForm);

    return (
        <FormTable
            tableOrigin="coils"
            columns={printedCoilColumns}
            rows={data}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            getRowId={(row) => row.coil_id}
            sortConfig={printedCoilsSortConfig}
            setSortConfig={setCoilsSortConfig}
            filters={printedCoilsFilters}
            setFilters={setCoilsFilters}
        >
            {data.map((row, index) => (
                <TableBodyRow
                    key={index}
                    onClick={(e) => {
                        if (e.target.tagName.toLowerCase() === "input") return;
                        handleRowClick(row.coil_id, setSelectedRows);
                    }}
                >
                    <TableBodyCell $isFirstChild>
                        <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={selectedRows[row.coil_id] || false}
                            onChange={() => {
                                handleRowClick(row.coil_id, setSelectedRows);
                            }}
                        />
                    </TableBodyCell>
                    <TableBodyCell>{row.coil_id}</TableBodyCell>
                    <TableBodyCell>{row.material_code}</TableBodyCell>
                    <TableBodyCell>{row.thickness}</TableBodyCell>
                    <TableBodyCell>{row.width}</TableBodyCell>
                    <TableBodyCell>{row.metal_type}</TableBodyCell>
                    <TableBodyCell>{row.batch}</TableBodyCell>
                    <TableBodyCell>{row.status}</TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    )
}