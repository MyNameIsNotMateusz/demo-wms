import { createSelector } from "@reduxjs/toolkit";
import { printedCoilColumns } from "./coilLabelsTableConfig";

const getCoilRows = (state) => state.coilLabelsForm.printedCoils;
const getCoilSortConfig = (state) =>
  state.coilLabelsForm.printedCoilsSortConfig;
const getCoilFilters = (state) => state.coilLabelsForm.printedCoilsFilters;

export const selectCoils = createSelector(
  [getCoilRows, getCoilSortConfig, getCoilFilters],
  (rows, sortConfig, filters) => {
    const columns = printedCoilColumns;

    const columnsMapping = {
      "Coil ID": "coil_id",
      "Material Code": "material_code",
      Thickness: "thickness",
      Width: "width",
      Specification: "metal_type",
      Batch: "batch",
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
