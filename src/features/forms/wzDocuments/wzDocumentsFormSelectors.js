import { createSelector } from "@reduxjs/toolkit";
import {
  shipmentsColumns,
  editableShipmentColumns,
} from "./wzDocumentsTableConfig";

const getShipmentsRows = (state) => state.wzDocumentsForm.shipments;
const getShipmentsSortConfig = (state) =>
  state.wzDocumentsForm.shipmentsSortConfig;
const getShipmentsFilters = (state) => state.wzDocumentsForm.shipmentsFilters;

const getEditableShipmentsRows = (state) =>
  state.wzDocumentsForm.editableShipmentData;
const getEditableShipmentsSortConfig = (state) =>
  state.wzDocumentsForm.editableShipmentSortConfig;
const getEditableShipmentsFilters = (state) =>
  state.wzDocumentsForm.editableShipmentFilters;

export const selectShipments = createSelector(
  [getShipmentsRows, getShipmentsSortConfig, getShipmentsFilters],
  (rows, sortConfig, filters) => {
    const columns = shipmentsColumns;

    const columnsMapping = {
      "Document Number": "document_number",
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

export const selectEditableShipments = createSelector(
  [
    getEditableShipmentsRows,
    getEditableShipmentsSortConfig,
    getEditableShipmentsFilters,
  ],
  (rows, sortConfig, filters) => {
    const columns = editableShipmentColumns;

    const columnsMapping = {
      "Pallet ID": "pallet",
      "Material Code": "material_code",
      "Material Name": "material_name",
      Quantity: "quantity",
      Unit: "material_type",
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
