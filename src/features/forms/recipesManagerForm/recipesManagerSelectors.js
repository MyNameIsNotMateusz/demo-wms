import { createSelector } from "@reduxjs/toolkit";
import { recipeMaterialsColumns } from "./recipesManagerTableConfig";

const getMaterialRows = (state) => state.recipesManagerForm.recipeMaterials;
const getMaterialSortConfig = (state) =>
  state.recipesManagerForm.recipeMaterialsSortConfig;
const getMaterialFilters = (state) =>
  state.recipesManagerForm.recipeMaterialsFilters;

export const selectMaterials = createSelector(
  [
    getMaterialRows,
    getMaterialSortConfig,
    getMaterialFilters,
    (state, selectedProcess) => selectedProcess,
  ],
  (rows, sortConfig, filters, selectedProcess) => {
    const columns = recipeMaterialsColumns;

    const columnsMapping = {
      "Material Code": "material_code",
      Quantity: "quantity",
    };

    // 🔥 znajdź właściwy proces
    const currentProcess = rows.find((r) => r.process === selectedProcess);

    const inputs = currentProcess ? currentProcess.inputs : [];

    const filteredItems = inputs.filter((row) => {
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
