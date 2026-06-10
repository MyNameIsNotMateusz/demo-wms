import { useSelector } from "react-redux"
import { FormTable } from "../../../components/layout"
import { palletColumns } from "./palletLabelsTableConfig"
import { setPalletsSortConfig, setPalletsFilters } from "./palletLabelsFormSlice"
import { TableBodyCell, TableBodyRow } from "../../../components/ui/table/TableBase.styles"
import { handleRowClick } from "../../../utils/table/tableRowSelection"

export const PalletLabelsTable = ({ data, selectedRows, setSelectedRows }) => {
    const { palletsSortConfig, palletsFilters } = useSelector(
        (state) => state.palletLabelsForm
    );

    return (
        <FormTable
            tableOrigin="palletLabels"
            columns={palletColumns}
            rows={data}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            getRowId={(row) => row.pallet_id}
            sortConfig={palletsSortConfig}
            setSortConfig={setPalletsSortConfig}
            filters={palletsFilters}
            setFilters={setPalletsFilters}
        >
            {data.map((row, index) => (
                <TableBodyRow
                    key={index}
                    onClick={(e) => {
                        if (e.target.tagName.toLowerCase() === "input") return;
                        handleRowClick(row.pallet_id, setSelectedRows);
                    }}
                >
                    <TableBodyCell $isFirstChild>
                        <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={selectedRows[row.pallet_id] || false}
                            onChange={() => {
                                handleRowClick(row.pallet_id, setSelectedRows)
                            }}
                        />
                    </TableBodyCell>
                    <TableBodyCell>
                        {row.created_date}
                    </TableBodyCell>
                    <TableBodyCell>
                        {row.pallet_id}
                    </TableBodyCell>
                    <TableBodyCell>
                        {row.material_seq_number}
                    </TableBodyCell>
                    <TableBodyCell>
                        {row.material_code}
                    </TableBodyCell>
                    <TableBodyCell>{row.material_destination}</TableBodyCell>
                    <TableBodyCell>
                        {parseFloat(row.quantity).toFixed(0)}
                    </TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    )
}