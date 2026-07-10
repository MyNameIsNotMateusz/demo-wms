import { createSelector } from "@reduxjs/toolkit";
import {
  inboundPalletsColumns,
  plannedDeliveriesColumns,
  materialsColumns,
} from "./inboundTableConfig";

const getManualRows = (state) => state.inboundForm.manualPallets;
const getManualSortConfig = (state) =>
  state.inboundForm.manualPalletsSortConfig;
const getManualFilters = (state) => state.inboundForm.manualPalletsFilters;

const getPlannedDeliveriesRows = (state) =>
  state.plannedDeliveries.plannedDeliveries;
const getPlannedDeliveriesSortConfig = (state) =>
  state.inboundForm.plannedDeliveriesSortConfig;
const getPlannedDeliveriesFilters = (state) =>
  state.inboundForm.plannedDeliveriesFilters;

const getDeliveryItems = (state) => state.inboundForm.deliveryItems;
const getDeliveryItemsSortConfig = (state) =>
  state.inboundForm.deliveryItemsSortConfig;
const getDeliveryItemsFilters = (state) =>
  state.inboundForm.deliveryItemsFilters;

const getMaterials = (state) => state.inboundForm.materials;
const getMaterialsSortConfig = (state) => state.inboundForm.materialsSortConfig;
const getMaterialsFilters = (state) => state.inboundForm.materialsFilters;

const getServiceRows = (state) => state.inboundForm.serviceItems;
const getServiceSortConfig = (state) =>
  state.inboundForm.serviceItemsSortConfig;
const getServiceFilters = (state) => state.inboundForm.serviceItemsFilters;

export const selectManual = createSelector(
  [getManualRows, getManualSortConfig, getManualFilters],
  (rows, sortConfig, filters) => {
    const columns = inboundPalletsColumns;

    const columnsMapping = {
      "Sequence Number": "seq_number",
      "Material Code": "material_code",
      Name: "name",
      Type: "type",
      "Batch No.": "batch",
      Quantity: "quantity",
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

export const selectPlannedDeliveries = createSelector(
  [
    getPlannedDeliveriesRows,
    getPlannedDeliveriesSortConfig,
    getPlannedDeliveriesFilters,
  ],
  (rows, sortConfig, filters) => {
    const columns = plannedDeliveriesColumns;

    const columnsMapping = {
      "Contractor Name": "contractor_name",
      "Planned Delivery": "planned_date",
      "Delivery Document": "delivery_document",
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

export const selectDeliveryItems = createSelector(
  [getDeliveryItems, getDeliveryItemsSortConfig, getDeliveryItemsFilters],
  (rows, sortConfig, filters) => {
    const columns = inboundPalletsColumns;

    const columnsMapping = {
      "Sequence Number": "seq_number",
      "Material Code": "material_code",
      Name: "name",
      Type: "type",
      "Batch No.": "batch",
      Quantity: "quantity",
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

export const selectMaterials = createSelector(
  [getMaterials, getMaterialsSortConfig, getMaterialsFilters],
  (rows, sortConfig, filters) => {
    const columns = materialsColumns;

    const columnsMapping = {
      "Material Code": "code",
      Width: "width",
      Thickness: "thickness",
      "Metal Type": "metal_type",
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

export const selectService = createSelector(
  [getServiceRows, getServiceSortConfig, getServiceFilters],
  (rows, sortConfig, filters) => {
    const columns = inboundPalletsColumns;

    const columnsMapping = {
      "Sequence Number": "seq_number",
      "Material Code": "material_code",
      Name: "name",
      Type: "type",
      "Batch No.": "batch",
      Quantity: "quantity",
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
