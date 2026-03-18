import { createSelector } from "@reduxjs/toolkit";
import {
  deliveryItemsColumns,
  plannedDeliveriesColumns,
} from "./plannedDeliveryTableConfig";

const getDeliveryItemsRows = (state) =>
  state.plannedDeliveryForm.deliveryItemsRows;
const getDeliveryItemsSortConfig = (state) =>
  state.plannedDeliveryForm.deliveryItemsSortConfig;
const getDeliveryItemsFilters = (state) =>
  state.plannedDeliveryForm.deliveryItemsFilters;

const getPlannedDeliveriesRows = (state) =>
  state.plannedDelivery.plannedDeliveries;
const getPlannedDeliveriesSortConfig = (state) =>
  state.plannedDeliveryForm.plannedDeliveriesSortConfig;
const getPlannedDeliveriesFilters = (state) =>
  state.plannedDeliveryForm.plannedDeliveriesFilters;

const getDeliveryDetailsRows = (state) =>
  state.plannedDeliveryForm.deliveryDetailsRows;
const getDeliveryDetailsSortConfig = (state) =>
  state.plannedDeliveryForm.deliveryDetailsSortConfig;
const getDeliveryDetailsFilters = (state) =>
  state.plannedDeliveryForm.deliveryDetailsFilters;

export const selectDeliveryItems = createSelector(
  [getDeliveryItemsRows, getDeliveryItemsSortConfig, getDeliveryItemsFilters],
  (rows, sortConfig, filters) => {
    const columns = deliveryItemsColumns;

    const columnsMapping = {
      "Sequence Number": "seq_number",
      "Material Code": "material_code",
      Name: "name",
      Type: "type",
      Quantity: "planned_quantity",
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

export const selectDeliveryDetails = createSelector(
  [
    getDeliveryDetailsRows,
    getDeliveryDetailsSortConfig,
    getDeliveryDetailsFilters,
  ],
  (rows, sortConfig, filters) => {
    const columns = deliveryItemsColumns;

    const columnsMapping = {
      "Sequence Number": "seq_number",
      "Material Code": "material_code",
      Name: "name",
      Type: "type",
      Quantity: "planned_quantity",
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

export const selectPlannedDeliveryRemarksById = (state, deliveryId) => {
  const deliveries = getPlannedDeliveriesRows(state);
  const delivery = deliveries.find((d) => d.id === deliveryId);

  return delivery?.remarks || "";
};
