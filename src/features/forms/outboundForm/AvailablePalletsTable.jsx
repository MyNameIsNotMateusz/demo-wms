import { useSelector } from "react-redux";
import { FormTable } from "../../../components/layout";
import { palletsColumns } from "./outboundTableConfig";
import { setPalletsSortConfig, setPalletsFilters } from "./outboundFormSlice";
import { TableBodyCell, TableBodyRow } from "../../../components/ui/table/TableBase.styles";
import { handleRowClick } from "../../../utils/table/tableRowSelection";

export const AvailablePalletsTable = ({
    data,
    selectedRows,
    setSelectedRows
}) => {

    const { palletsSortConfig, palletsFilters } = useSelector((state) => state.outboundForm);

    return (
        <FormTable
            tableOrigin="availablePallets"
            columns={palletsColumns}
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
                    <TableBodyCell>{row.pallet_id}</TableBodyCell>
                    <TableBodyCell>{row.material_code}</TableBodyCell>
                    <TableBodyCell>
                        {row.created_at
                            ? new Date(row.created_at).toISOString().split("T")[0]
                            : ""}
                    </TableBodyCell>
                    <TableBodyCell>
                        {parseFloat(row.quantity).toFixed(0)}
                    </TableBodyCell>
                </TableBodyRow>
            ))}
        </FormTable>
    )
}