import { createSelector } from "@reduxjs/toolkit";

const getColumns = (state) => state.logisticsStock.columns;
const getRows = (state) => state.logisticsStock.rows;
const getSortConfig = (state) => state.logisticsStock.sortConfig;
const getFilters = (state) => state.logisticsStock.filters;

export const selectLogisticsStock = createSelector(
  [getColumns, getRows, getSortConfig, getFilters],
  (columns, rows, sortConfig, filters) => {
    const columnsMapping = {
      "Pallet ID": "pallet_id",
      "Material Code": "material_code",
      "Material Name": "material_name",
      Type: "type",
      Quantity: "quantity",
      Unit: "unit",
      Status: "status",
      Destination: "destination",
      "Created At": "created_at",
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

    if (Object.values(sortConfig).length === 0) {
      return filteredItems;
    } else {
      const currentSortedColumnIndex = Object.keys(sortConfig)[0];
      const order = Object.values(sortConfig)[0];
      const header = columns[parseInt(currentSortedColumnIndex, 10)];
      const dataKey = columnsMapping[header];

      switch (order) {
        case "asc":
          return filteredItems.sort((a, b) => {
            const aVal = (a[dataKey] ?? "").toString();
            const bVal = (b[dataKey] ?? "").toString();
            return aVal.localeCompare(bVal, "pl", { numeric: true });
          });
        case "desc":
          return filteredItems.sort((a, b) => {
            const aVal = (a[dataKey] ?? "").toString();
            const bVal = (b[dataKey] ?? "").toString();
            return bVal.localeCompare(aVal, "pl", { numeric: true });
          });
        case "original":
        default:
          return filteredItems;
      }
    }
  },
);
