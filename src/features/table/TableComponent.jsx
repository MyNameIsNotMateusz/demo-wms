import { useState } from "react";
import { applyTableHeaderShadow } from "./tableEffects";
import { adjustColumnWidths } from "../../utils/table";
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
  ColumnHeader,
} from "./TableComponent.styles";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

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
                  <ColumnHeader
                    onClick={() => {
                      setSortConfig(idx);
                      adjustColumnWidths(tableOrigin);
                    }}
                  >
                    <ColumnTitle>{title}</ColumnTitle>
                    <SortIconWrapper state={sortConfig[idx]}>
                      <ChevronUpIcon />
                      <ChevronDownIcon />
                    </SortIconWrapper>
                  </ColumnHeader>

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
