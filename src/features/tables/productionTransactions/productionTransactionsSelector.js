import { createSelector } from "@reduxjs/toolkit";
import { productionTransactionsColumns } from "./productionTransactionsColumns";

const getRows = (state) => state.productionTransactions.rows;
const getSortConfig = (state) => state.productionTransactions.sortConfig;
const getFilters = (state) => state.productionTransactions.filters;

export const selectProductionTransactions = createSelector(
  [getRows, getSortConfig, getFilters],
  (rows, sortConfig, filters) => {
    const columns = productionTransactionsColumns;

    const columnsMapping = {
      Direction: "direction",
      "Transaction ID": "process_execution_id",
      "Process Type": "process_type",
      "Production Order Number": "production_order_number",
      "Material Code": "material_code",
      "Material Type": "material_type",
      Destination: "material_destination",
      "Total Quantity": "quantity",
      "Created At": "transaction_datetime",
      Creator: "creator_name",
      "Creator Mail": "creator_email",
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
