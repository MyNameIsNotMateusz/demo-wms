import { createSelector } from "@reduxjs/toolkit";
import { coilTransactionsColumns } from "./coilTransactionsColumns";

const getRows = (state) => state.coilTransactions.rows;
const getSortConfig = (state) => state.coilTransactions.sortConfig;
const getFilters = (state) => state.coilTransactions.filters;

export const selectCoilTransactions = createSelector(
  [getRows, getSortConfig, getFilters],
  (rows, sortConfig, filters) => {
    const columns = coilTransactionsColumns;

    const columnsMapping = {
      "Reference Document ID": "reference_document_id",
      Direction: "direction",
      "Coil ID": "coil_id",
      "Transaction Date": "transaction_date",
      "Partner Tax Number": "partner_nip",
      "Sequence Number": "seq_number",
      Specification: "metal_type",
      Thickness: "thickness",
      Width: "width",
      "Coil Weight": "coil_weight",
      "Batch No.": "batch_no",
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
