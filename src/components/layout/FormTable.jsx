import {
  StyledFormTable,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  ColumnFilterContainer,
  ColumnTitle,
  SortIconWrapper,
  ColumnHeader,
  ColumnFilterInput,
  TableBody,
} from "./FormTable.styles";
import {
  selectAllRows,
  deselectAllRows,
  adjustColumnWidths,
  toggleSort,
  handleFilterChange,
} from "../../utils/table";
import { useDispatch } from "react-redux";

export const FormTable = ({
  tableOrigin,
  columns,
  rows,
  selectedRows,
  setSelectedRows,
  idKey,
  sortConfig,
  setSortConfig,
  filters,
  setFilters,
  children,
}) => {
  const dispatch = useDispatch();

  return (
    <StyledFormTable data-table-origin={tableOrigin}>
      <TableHeader>
        <TableHeaderRow>
          <TableHeaderCell>
            <input
              type="checkbox"
              title="Select all rows"
              style={{ cursor: "pointer" }}
              disabled={!rows.length}
              checked={
                rows.length === 0
                  ? false
                  : Object.keys(selectedRows).length === rows.length
              }
              onChange={(e) => {
                if (e.target.checked) {
                  selectAllRows(rows, setSelectedRows, idKey);
                } else {
                  deselectAllRows(setSelectedRows);
                }
              }}
            />
          </TableHeaderCell>
          {columns.map((title, index) => (
            <TableHeaderCell key={index}>
              <ColumnFilterContainer
                onClick={() => toggleSort(index, setSortConfig, dispatch)}
              >
                <ColumnHeader>
                  <ColumnTitle>{title}</ColumnTitle>
                  <SortIconWrapper state={sortConfig[index]}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </SortIconWrapper>
                </ColumnHeader>
                <ColumnFilterInput
                  onChange={(e) => {
                    handleFilterChange(
                      index,
                      e.target.value,
                      setFilters,
                      dispatch,
                    );
                  }}
                  value={filters[index] || ""}
                  onFocus={() => adjustColumnWidths(tableOrigin)}
                />
              </ColumnFilterContainer>
            </TableHeaderCell>
          ))}
        </TableHeaderRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </StyledFormTable>
  );
};
