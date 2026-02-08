import { useState } from "react";
import { applyTableHeaderShadow } from "./tableEffects";
import { adjustColumnWidths } from "../../utils/table/adjustColumnWidths";
import { startColumnResize } from "./useColumnResize";
import {
  TableWrapper,
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  ColumnFilterContainer,
  ColumnTitle,
  ColumnFilterInput,
  ColumnResizer,
  SortIconWrapper,
  TableBody,
  TableBodyRow,
  TableBodyCell,
} from "./TableComponent.styles";

export const TableComponent = ({
  tableOrigin,
  columns,
  setSortConfig,
  filters,
  setFilters,
  sortConfig,
  currentData,
  rowStartIndex,
}) => {
  const [activeRow, setActiveRow] = useState(null);
  const [savedColumnWidths, setSavedColumnWidths] = useState({});
  const [activeResizerIndex, setActiveResizerIndex] = useState(null);
  const [hasResized, setHasResized] = useState(false);

  return (
    <TableWrapper className="table-container" onScroll={applyTableHeaderShadow}>
      <Table
        data-table-origin={tableOrigin}
        style={{
          width: hasResized ? "auto" : "100%",
        }}
      >
        <TableHeader className="table-header">
          <TableHeaderRow>
            <TableHeaderCell />
            {columns.map((title, idx) => (
              <TableHeaderCell
                key={idx}
                className="tableCell"
                data-column-index={idx}
                style={{
                  width: savedColumnWidths[idx] || undefined,
                  minWidth: savedColumnWidths[idx] || undefined,
                  maxWidth: savedColumnWidths[idx] || undefined,
                }}
              >
                <ColumnFilterContainer>
                  <ColumnTitle onClick={() => setSortConfig(idx)}>
                    {title}
                  </ColumnTitle>
                  <ColumnFilterInput
                    value={filters[idx] || ""}
                    onChange={(e) =>
                      setFilters({ index: idx, value: e.target.value })
                    }
                    onFocus={() => adjustColumnWidths(tableOrigin)}
                  />
                </ColumnFilterContainer>
                <ColumnResizer
                  onMouseDown={(e) => {
                    setHasResized(true);
                    startColumnResize(
                      e,
                      idx,
                      adjustColumnWidths,
                      tableOrigin,
                      setSavedColumnWidths,
                    );
                  }}
                  onMouseEnter={() => setActiveResizerIndex(idx)}
                  onMouseLeave={() => setActiveResizerIndex(null)}
                  $active={activeResizerIndex === idx}
                />
                <SortIconWrapper state={sortConfig[idx]}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
                  </svg>
                </SortIconWrapper>
              </TableHeaderCell>
            ))}
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {currentData.map((row, rowIndex) => (
            <TableBodyRow
              key={rowIndex}
              $isActive={activeRow === rowIndex}
              onClick={() =>
                setActiveRow(rowIndex === activeRow ? null : rowIndex)
              }
            >
              <TableBodyCell
                $isActive={activeRow === rowIndex}
                onClick={() =>
                  setActiveRow(rowIndex === activeRow ? null : rowIndex)
                }
              >
                {rowIndex + rowStartIndex + 1}
              </TableBodyCell>
              {Object.values(row).map((cellValue, cellIndex) => {
                let displayValue = cellValue;

                if (
                  typeof cellValue === "string" &&
                  !isNaN(cellValue) &&
                  cellValue.trim() !== ""
                ) {
                  displayValue = Number(cellValue);
                }

                return (
                  <TableBodyCell
                    key={cellIndex}
                    data-column-index={cellIndex}
                    style={{
                      width: savedColumnWidths[cellIndex] || undefined,
                      minWidth: savedColumnWidths[cellIndex] || undefined,
                      maxWidth: savedColumnWidths[cellIndex] || undefined,
                    }}
                  >
                    {displayValue}
                  </TableBodyCell>
                );
              })}
            </TableBodyRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};
