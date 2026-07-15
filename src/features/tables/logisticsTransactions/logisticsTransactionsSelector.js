import { createSelector } from "@reduxjs/toolkit";
import { logisticsTransactionsColumns } from "./logisticsTransactionsColumns";

const getRows = (state) => state.logisticsTransactions.rows;
const getSortConfig = (state) => state.logisticsTransactions.sortConfig;
const getFilters = (state) => state.logisticsTransactions.filters;

export const selectLogisticsTransactions = createSelector(
  [getRows, getSortConfig, getFilters],
  (rows, sortConfig, filters) => {
    const columns = logisticsTransactionsColumns;

    const columnsMapping = {
      "Transaction date": "transaction_date",
      Direction: "direction",
      "Transaction type": "transaction_type",
      "Document number": "document_number",
      "Contractor name": "contractor_name",
      "Pallet ID": "pallet_id",
      "Material name": "material_name",
      "Material type": "material_type",
      Quantity: "quantity",
      Unit: "unit",
      Creator: "creator_name",
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
