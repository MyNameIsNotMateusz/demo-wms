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
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export const FormTable = ({
  tableOrigin,
  columns,
  rows,
  selectedRows,
  setSelectedRows,
  getRowId,
  sortConfig,
  setSortConfig,
  filters,
  setFilters,
  children,
  showSelectAll = true,
}) => {
  const dispatch = useDispatch();

  return (
    <StyledFormTable data-table-origin={tableOrigin}>
      <TableHeader>
        <TableHeaderRow>
          <TableHeaderCell>
            {showSelectAll && (
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
                    selectAllRows(rows, setSelectedRows, getRowId);
                  } else {
                    deselectAllRows(setSelectedRows);
                  }
                }}
              />
            )}

          </TableHeaderCell>
          {columns.map((title, index) => (
            <TableHeaderCell key={index} className="tableCell">
              <ColumnFilterContainer>
                <ColumnHeader onClick={() => toggleSort(index, setSortConfig, dispatch)}>
                  <ColumnTitle>{title}</ColumnTitle>
                  <SortIconWrapper state={sortConfig[index]}>
                    <ChevronUpIcon />
                    <ChevronDownIcon />
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
