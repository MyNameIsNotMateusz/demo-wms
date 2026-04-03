import { createSelector } from "@reduxjs/toolkit";
import {
  contractorColumns,
  projectsColumns,
} from "./contractorManagementTableConfig";

const getContractorRows = (state) => state.contractors.contractors;
const getContractorSortConfig = (state) =>
  state.contractorManagementForm.contractorSortConfig;
const getContractorFilters = (state) =>
  state.contractorManagementForm.contractorFilters;

const getProjectsRows = (state) => state.contractorManagementForm.projects;
const getProjectsSortConfig = (state) =>
  state.contractorManagementForm.projectsSortConfig;
const getProjectsFilters = (state) =>
  state.contractorManagementForm.projectsFilters;

export const selectContractors = createSelector(
  [getContractorRows, getContractorSortConfig, getContractorFilters],
  (rows, sortConfig, filters) => {
    const columns = contractorColumns;

    const columnsMapping = {
      Name: "name",
      "Tax Number": "tax_id",
      Address: "address",
      "Legal Form": "legal_form",
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

export const selectProjects = createSelector(
  [getProjectsRows, getProjectsSortConfig, getProjectsFilters],
  (rows, sortConfig, filters) => {
    const columns = projectsColumns;

    const columnsMapping = {
      "Project Code": "project_code",
      Name: "name",
      Type: "type",
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
