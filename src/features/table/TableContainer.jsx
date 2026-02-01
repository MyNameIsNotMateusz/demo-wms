import { TableWrapper } from "./TableContainer.styles";
import { TableComponent } from "./TableComponent";
import { TablePagination } from "./TablePagination";
import { useEffect, useState } from "react";
import { adjustColumnWidths } from "../../utils/table/adjustColumnWidths";

export const TableContainer = ({
  tableOrigin,
  columns,
  data,
  setSortConfig,
  filters,
  sortConfig,
  setFilters,
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  useEffect(() => {
    setPage(1);
  }, [tableOrigin]);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const total = data.length;
  const safeStart = total === 0 ? 0 : start + 1;
  const safeEnd = Math.min(end, total);
  const currentData = data.slice(start, end);
  const totalPages = Math.ceil(data.length / pageSize);

  const changePage = (offset) => {
    adjustColumnWidths(tableOrigin);
    const newPage = page + offset;
    const safePage = Math.max(1, Math.min(newPage, totalPages));
    setPage(safePage);
  };

  return (
    <TableWrapper>
      <TableComponent
        tableOrigin={tableOrigin}
        columns={columns}
        setSortConfig={setSortConfig}
        filters={filters}
        setFilters={setFilters}
        sortConfig={sortConfig}
        currentData={currentData}
      />
      <TablePagination
        changePage={changePage}
        safeStart={safeStart}
        safeEnd={safeEnd}
        total={total}
        page={page}
        totalPages={totalPages}
        setPageSize={setPageSize}
      />
    </TableWrapper>
  );
};
