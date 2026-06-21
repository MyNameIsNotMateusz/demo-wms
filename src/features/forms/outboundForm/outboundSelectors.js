import { createSelector } from "@reduxjs/toolkit";
import { palletsColumns } from "./outboundTableConfig";

const getPalletRows = (state) => state.outboundForm.pallets;
const getPalletSortConfig = (state) => state.outboundForm.palletsSortConfig;
const getPalletFilters = (state) => state.outboundForm.palletsFilters;

const getSelectedPalletRows = (state) => state.outboundForm.selectedPallets;
const getSelectedPalletSortConfig = (state) =>
  state.outboundForm.selectedPalletsSortConfig;
const getSelectedPalletFilters = (state) =>
  state.outboundForm.selectedPalletsFilters;

export const selectPallets = createSelector(
  [getPalletRows, getPalletSortConfig, getPalletFilters],
  (rows, sortConfig, filters) => {
    const columns = palletsColumns;

    const columnsMapping = {
      "Pallet ID": "pallet_id",
      "Material Code": "material_code",
      "Created At": "created_at",
      Quantity: "quantity",
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

export const selectSelectedPallets = createSelector(
  [
    getSelectedPalletRows,
    getSelectedPalletSortConfig,
    getSelectedPalletFilters,
  ],
  (rows, sortConfig, filters) => {
    const columns = palletsColumns;

    const columnsMapping = {
      "Pallet ID": "pallet_id",
      "Material Code": "material_code",
      "Created At": "created_at",
      Quantity: "quantity",
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

export const selectSummary = createSelector([selectSelectedPallets], (data) => {
  const summaryMap = {};

  data.forEach((item) => {
    const code = item.material_code;
    const quantity = Number(item.quantity);

    if (!summaryMap[code]) {
      summaryMap[code] = {
        material_code: code,
        count: 0,
        total_quantity: 0,
      };
    }

    summaryMap[code].count += 1;
    summaryMap[code].total_quantity += quantity;
  });

  return Object.values(summaryMap);
});
