import { createSelector } from "@reduxjs/toolkit";
import { coilStockColumns } from "./coilStockColumns";

const getRows = (state) => state.coilStock.rows;
const getSortConfig = (state) => state.coilStock.sortConfig;
const getFilters = (state) => state.coilStock.filters;

export const selectCoilStock = createSelector(
  [getRows, getSortConfig, getFilters],
  (rows, sortConfig, filters) => {
    const columns = coilStockColumns;

    const columnsMapping = {
      "Coil ID": "coil_id",
      "Material Code": "material_code",
      Width: "width",
      Thickness: "thickness",
      Weight: "weight",
      Unit: "unit",
      Batch: "batch",
      Status: "status",
      "Received At": "received_at",
      "Last Update": "last_update",
    };

    const filteredItems = rows.filter((row) => {
      return Object.keys(filters).every((key) => {
        const colIndex = parseInt(key, 10);
        const header = columns[colIndex];
        const dataKey = columnsMapping[header];
        const cellValue = row[dataKey];

        return (cellValue ?? "")
          .toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase());
      });
    });

    if (Object.keys(sortConfig).length === 0) {
      return filteredItems;
    }

    const currentSortedColumnIndex = Object.keys(sortConfig)[0];
    const order = sortConfig[currentSortedColumnIndex];
    const header = columns[parseInt(currentSortedColumnIndex, 10)];
    const dataKey = columnsMapping[header];

    return [...filteredItems].sort((a, b) => {
      const aVal = (a[dataKey] ?? "").toString();
      const bVal = (b[dataKey] ?? "").toString();

      return order === "desc"
        ? bVal.localeCompare(aVal, "pl", { numeric: true })
        : aVal.localeCompare(bVal, "pl", { numeric: true });
    });
  },
);
