import { TableWrapper } from "./TableContainer.styles";
import { TableComponent } from "./TableComponent";

export const TableContainer = ({
  tableOrigin,
  columns,
  logisticsStock,
  setSortConfig,
  filters,
  sortConfig,
  setFilters,
}) => {
  return (
    <TableWrapper>
      <TableComponent
        tableOrigin={tableOrigin}
        columns={columns}
        setSortConfig={setSortConfig}
        filters={filters}
        setFilters={setFilters}
        sortConfig={sortConfig}
        currentData={logisticsStock}
      />
    </TableWrapper>
  );
};
