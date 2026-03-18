import { FormTable } from "../../../components/layout";
import { plannedDeliveriesColumns } from "./plannedDeliveryTableConfig";
import {
  setPlannedDeliveriesSortConfig,
  setPlannedDeliveriesFilters,
} from "./plannedDeliveryFormSlice";
import { useSelector } from "react-redux";
import {
  TableBodyCell,
  TableBodyRow,
} from "../../../components/ui/table/TableBase.styles";
import { handleRowClick } from "../../../utils/table/tableRowSelection";

export const PlannedDeliveriesTable = ({
  data,
  selectedRows,
  setSelectedRows,
}) => {
  const { plannedDeliveriesSortConfig, plannedDeliveriesFilters } = useSelector(
    (state) => state.plannedDeliveryForm,
  );

  return (
    <FormTable
      tableOrigin="plannedDeliveries"
      columns={plannedDeliveriesColumns}
      sortConfig={plannedDeliveriesSortConfig}
      setSortConfig={setPlannedDeliveriesSortConfig}
      filters={plannedDeliveriesFilters}
      setFilters={setPlannedDeliveriesFilters}
      showSelectAll={false}
    >
      {data.map((row, index) => (
        <TableBodyRow
          key={index}
          onClick={(e) => {
            if (e.target.tagName.toLowerCase() === "input") return;
            handleRowClick(row.id, setSelectedRows, false);
          }}
        >
          <TableBodyCell>
            <input
              type="checkbox"
              style={{ cursor: "pointer" }}
              checked={selectedRows[row.id] || false}
              onChange={() => {
                handleRowClick(row.id, setSelectedRows, false);
              }}
            />
          </TableBodyCell>

          <TableBodyCell>{row.contractor_name}</TableBodyCell>
          <TableBodyCell>{row.planned_date}</TableBodyCell>
          <TableBodyCell>{row.delivery_document}</TableBodyCell>
        </TableBodyRow>
      ))}
    </FormTable>
  );
};
