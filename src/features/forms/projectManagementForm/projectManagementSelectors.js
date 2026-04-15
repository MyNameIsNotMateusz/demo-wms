import { createSelector } from "@reduxjs/toolkit";
import { projectColumns, materialsColumns } from "./projectManagementTableConfig";

const getProjectRows = (state) => state.projects.projectsList;
const getProjectSortConfig = (state) =>
  state.projectManagementForm.projectSortConfig;
const getProjectFilters = (state) => state.projectManagementForm.projectFilters;

const getMaterialRows = (state) => state.projectManagementForm.materialsTable;
const getMaterialsSortConfig = (state) =>
  state.projectManagementForm.materialsSortConfig;
const getMaterialsFilters = (state) =>
  state.projectManagementForm.materialsFilters;

export const selectProjects = createSelector(
  [getProjectRows, getProjectSortConfig, getProjectFilters],
  (rows, sortConfig, filters) => {
    const columns = projectColumns;

    const columnsMapping = {
      "Project Code": "code",
      Name: "name",
      Type: "type",
      Status: "is_active",
      "Start Date": "start_date",
      "End Date": "end_date",
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
  [getMaterialRows, getMaterialsSortConfig, getMaterialsFilters],
  (rows, sortConfig, filters) => {
    const columns = materialsColumns;

    const columnsMapping = {
      "Material Type": "type",
      "Material Code": "material_code",
      "Material Name": "name",
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
