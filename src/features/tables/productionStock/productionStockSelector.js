import { createSelector } from "@reduxjs/toolkit";
import { productionStockColumns } from "./productionStockColumns";

const getRows = (state) => state.productionStock.rows;
const getSortConfig = (state) => state.productionStock.sortConfig;
const getFilters = (state) => state.productionStock.filters;

export const selectProductionStock = createSelector(
  [getRows, getSortConfig, getFilters],
  (rows, sortConfig, filters) => {
    const columns = productionStockColumns;

    const columnsMapping = {
      "Material Code": "material_code",
      "Material Name": "material_name",
      Destination: "destination",
      "Total Quantity": "total_quantity",
      Unit: "unit",
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
