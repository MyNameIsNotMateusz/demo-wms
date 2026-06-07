import { createSelector } from "@reduxjs/toolkit";
import {
  palletsColumns,
  addedPalletColumns,
} from "./stockModificationTableConfig";

const getPalletsRows = (state) => state.stockModificationForm.pallets;
const getPalletsSortConfig = (state) =>
  state.stockModificationForm.palletsSortConfig;
const getPalletsFilters = (state) => state.stockModificationForm.palletsFilters;

const getRemovedPalletsRows = (state) =>
  state.stockModificationForm.removedPallets;
const getRemovedPalletsSortConfig = (state) =>
  state.stockModificationForm.removedPalletsSortConfig;
const getRemovedPalletsFilters = (state) =>
  state.stockModificationForm.removedPalletsFilters;

const getEditedPalletsRows = (state) =>
  state.stockModificationForm.editedPallets;
const getEditedPalletsSortConfig = (state) =>
  state.stockModificationForm.editedPalletsSortConfig;
const getEditedPalletsFilters = (state) =>
  state.stockModificationForm.editedPalletsFilters;

const getAddedPalletsRows = (state) => state.stockModificationForm.addedPallets;
const getAddedPalletsSortConfig = (state) =>
  state.stockModificationForm.addedPalletsSortConfig;
const getAddedPalletsFilters = (state) =>
  state.stockModificationForm.addedPalletsFilters;

export const selectPallets = createSelector(
  [getPalletsRows, getPalletsSortConfig, getPalletsFilters],
  (rows, sortConfig, filters) => {
    const columns = palletsColumns;

    const columnsMapping = {
      "Pallet ID": "id",
      "Material Code": "material_code",
      "Material Type": "material_type",
      Destination: "destination",
      Quantity: "quantity",
      Status: "status",
      "Creation Date": "created_at",
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

export const selectRemovedPallets = createSelector(
  [
    getRemovedPalletsRows,
    getRemovedPalletsSortConfig,
    getRemovedPalletsFilters,
  ],
  (rows, sortConfig, filters) => {
    const columns = palletsColumns;

    const columnsMapping = {
      "Pallet ID": "id",
      "Material Code": "material_code",
      "Material Type": "material_type",
      Destination: "destination",
      Quantity: "quantity",
      Status: "status",
      "Creation Date": "created_at",
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

export const selectEditedPallets = createSelector(
  [getEditedPalletsRows, getEditedPalletsSortConfig, getEditedPalletsFilters],
  (rows, sortConfig, filters) => {
    const columns = palletsColumns;

    const columnsMapping = {
      "Pallet ID": "id",
      "Material Code": "material_code",
      "Material Type": "material_type",
      Destination: "destination",
      Quantity: "quantity",
      Status: "status",
      "Creation Date": "created_at",
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

export const selectAddedPallets = createSelector(
  [getAddedPalletsRows, getAddedPalletsSortConfig, getAddedPalletsFilters],
  (rows, sortConfig, filters) => {
    const columns = addedPalletColumns;

    const columnsMapping = {
      Client: "client",
      Project: "project",
      "Pallet ID": "pallet_id",
      "Material Code": "material_code",
      Status: "status",
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
