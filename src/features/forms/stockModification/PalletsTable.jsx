import { useSelector } from "react-redux";
import { FormTable } from "../../../components/layout";
import { palletsColumns } from "./stockModificationTableConfig";
import {
  setPalletsSortConfig,
  setPalletsFilters,
} from "./stockModificationSlice";
import {
  TableBodyCell,
  TableBodyRow,
} from "../../../components/ui/table/TableBase.styles";
import { handleRowClick } from "../../../utils/table/tableRowSelection";

export const PalletsTable = ({ data, selectedRows, setSelectedRows }) => {
  const { palletsSortConfig, palletsFilters } = useSelector(
    (state) => state.stockModificationForm,
  );

  return (
    <FormTable
      tableOrigin="pallets"
      columns={palletsColumns}
      rows={data}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      getRowId={(row) => row.id}
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
            handleRowClick(row.id, setSelectedRows);
          }}
        >
          <TableBodyCell $isFirstChild>
            <input
              type="checkbox"
              style={{ cursor: "pointer" }}
              checked={selectedRows[row.id] || false}
              onChange={() => {
                handleRowClick(row.id, setSelectedRows);
              }}
            />
          </TableBodyCell>
          <TableBodyCell>{row.id}</TableBodyCell>
          <TableBodyCell>{row.material_code}</TableBodyCell>
          <TableBodyCell>{row.material_type}</TableBodyCell>
          <TableBodyCell>{row.destination}</TableBodyCell>
          <TableBodyCell>
            {parseFloat(row.quantity).toFixed(0)}
          </TableBodyCell>
          <TableBodyCell>{row.status}</TableBodyCell>
          <TableBodyCell>{row.created_at}</TableBodyCell>
        </TableBodyRow>
      ))}
    </FormTable>
  );
};
