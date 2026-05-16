import { createSelector } from "@reduxjs/toolkit";
import {
  createdPalletsColumns,
  requiredMaterialsColumns,
} from "./createComponentsTableConfig";

const getRecipes = (state) => state.recipes.recipes;

const getCreatedPalletsRows = (state) =>
  state.createComponentsForm.createdPallets;
const getCreatedPalletsSortConfig = (state) =>
  state.createComponentsForm.createdPalletsSortConfig;
const getCreatedPalletsFilters = (state) =>
  state.createComponentsForm.createdPalletsFilters;

const getRequiredMaterialsRows = (state) =>
  state.createComponentsForm.requiredMaterialsStock;
const getRequiredMaterialsSortConfig = (state) =>
  state.createComponentsForm.requiredMaterialsSortConfig;
const getRequiredMaterialsFilters = (state) =>
  state.createComponentsForm.requiredMaterialsFilters;

export const selectProjects = createSelector([getRecipes], (recipes) => {
  if (!recipes?.clients) return [];

  return recipes.clients.flatMap((client) =>
    Array.isArray(client.projects) ? client.projects : [],
  );
});

export const selectCreatedPallets = createSelector(
  [
    getCreatedPalletsRows,
    getCreatedPalletsSortConfig,
    getCreatedPalletsFilters,
  ],
  (rows, sortConfig, filters) => {
    const columns = createdPalletsColumns;

    const columnsMapping = {
      Quantity: "quantity",
      Status: "status",
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

export const selectRequiredMaterials = createSelector(
  [
    getRequiredMaterialsRows,
    getRequiredMaterialsSortConfig,
    getRequiredMaterialsFilters,
  ],
  (rows, sortConfig, filters) => {
    const columns = requiredMaterialsColumns;

    const columnsMapping = {
      "Material Code": "material_code",
      Quantity: "quantity",
      "Available Quantity": "availableQuantity",
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
