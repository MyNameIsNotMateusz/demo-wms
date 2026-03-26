import { createSelector } from "@reduxjs/toolkit";
import { userColumns } from "./userManagementTableConfig";

const getUserRows = (state) => state.userManagementForm.userRows;
const getUserSortConfig = (state) => state.userManagementForm.userSortConfig;
const getUserFilters = (state) => state.userManagementForm.userFilters;

export const selectUsers = createSelector(
  [getUserRows, getUserSortConfig, getUserFilters],
  (rows, sortConfig, filters) => {
    const columns = userColumns;

    const columnsMapping = {
      Name: "name",
      Email: "email",
      Position: "position",
      Role: "role",
      Status: "is_active",
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
