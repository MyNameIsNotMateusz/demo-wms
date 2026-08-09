import { TableWrapper } from "./TableContainer.styles";
import { TableComponent } from "./TableComponent";
import { Loader } from "../../components/ui";
import { TablePagination } from "../../components/ui/table/TablePagination";
import { Tabs } from "./Tabs";
import { TableActions } from "./TableActions";
import { useEffect } from "react";
import { adjustColumnWidths } from "../../utils/table";
import { selectIsWarehouseDataLoaded } from "../../store/selectors/tableLoadSelectors";
import { useSelector } from "react-redux";
import { formRegistry } from "../../data/formsRegistry";
import { useOutletContext } from "react-router-dom";
import { usePagination } from "../../hooks/usePagination";

export const TableContainer = ({
  tableOrigin,
  columns,
  data,
  setSortConfig,
  filters,
  sortConfig,
  setFilters,
}) => {
  const isLoaded = useSelector(selectIsWarehouseDataLoaded);

  const { isTableDarkened, activeForm, handleCloseForm } = useOutletContext();
  const ActiveForm = formRegistry[activeForm];

  const {
    page,
    pageSize,
    setPageSize,
    start,
    currentData,
    total,
    totalPages,
    safeStart,
    safeEnd,
    changePage,
    setPage,
  } = usePagination(data, () => adjustColumnWidths(tableOrigin));

  useEffect(() => {
    setPage(1);
  }, [tableOrigin, setPage]);

  return (
    <TableWrapper>
      {isTableDarkened && ActiveForm && (
        <ActiveForm onClose={handleCloseForm} />
      )}

      {!isLoaded ? (
        <Loader />
      ) : (
        <TableComponent
          tableOrigin={tableOrigin}
          columns={columns}
          setSortConfig={setSortConfig}
          filters={filters}
          setFilters={setFilters}
          sortConfig={sortConfig}
          currentData={currentData}
          rowStartIndex={start}
        />
      )}

      <TablePagination
        changePage={changePage}
        safeStart={safeStart}
        safeEnd={safeEnd}
        total={total}
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />

      <TableActions />
      <Tabs />
    </TableWrapper>
  );
};