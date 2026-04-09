import { createSelector } from "@reduxjs/toolkit";
import { materialColumns } from "./materialManagementTableConfig";

const getMaterialRows = (state) => state.materials.materials;
const getMaterialSortConfig = (state) =>
  state.materialManagementForm.materialSortConfig;
const getMaterialFilters = (state) =>
  state.materialManagementForm.materialFilters;

export const selectMaterials = createSelector(
  [getMaterialRows, getMaterialSortConfig, getMaterialFilters],
  (rows, sortConfig, filters) => {
    const columns = materialColumns;

    const columnsMapping = {
      Code: "code",
      "Sequence Number": "seq_number",
      Name: "name",
      Type: "type",
      Destination: "destination",
      Simplified: "is_simplified",
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
