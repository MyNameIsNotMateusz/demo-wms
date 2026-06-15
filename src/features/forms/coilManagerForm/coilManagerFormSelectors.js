import { createSelector } from "@reduxjs/toolkit";
import { coilColumns } from "./coilManagerTableConfig";

const getProductionRows = (state) => state.coilManagerForm.productionCoils;
const getProductionSortConfig = (state) =>
  state.coilManagerForm.productionCoilsSortConfig;
const getProductionFilters = (state) =>
  state.coilManagerForm.productionCoilsFilters;

const getConsumedRows = (state) => state.coilManagerForm.consumedCoils;
const getConsumedSortConfig = (state) =>
  state.coilManagerForm.consumedCoilsSortConfig;
const getConsumedFilters = (state) =>
  state.coilManagerForm.consumedCoilsFilters;

export const selectProductionCoils = createSelector(
  [getProductionRows, getProductionSortConfig, getProductionFilters],
  (rows, sortConfig, filters) => {
    const columns = coilColumns;

    const columnsMapping = {
      "Coil ID": "coil_id",
      Line: "line",
      "Material Code": "material_code",
      Thickness: "thickness",
      Width: "width",
      Specification: "metal_type",
      Batch: "batch",
      Weight: "weight",
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

export const selectConsumedCoils = createSelector(
  [getConsumedRows, getConsumedSortConfig, getConsumedFilters],
  (rows, sortConfig, filters) => {
    const columns = coilColumns;

    const columnsMapping = {
      "Coil ID": "coil_id",
      Line: "line",
      "Material Code": "material_code",
      Thickness: "thickness",
      Width: "width",
      Specification: "metal_type",
      Batch: "batch",
      Weight: "weight",
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
