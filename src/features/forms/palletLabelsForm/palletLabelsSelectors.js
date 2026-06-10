import { createSelector } from "@reduxjs/toolkit";
import { palletColumns } from "./palletLabelsTableConfig";

const getPalletRows = (state) => state.palletLabelsForm.pallets;
const getPalletSortConfig = (state) => state.palletLabelsForm.palletsSortConfig;
const getPalletFilters = (state) => state.palletLabelsForm.palletsFilters;

export const selectPallets = createSelector(
  [getPalletRows, getPalletSortConfig, getPalletFilters],
  (rows, sortConfig, filters) => {
    const columns = palletColumns;

    const columnsMapping = {
      "Created At": "created_date",
      "Box ID": "pallet_id",
      "Sequence Number": "material_seq_number",
      "Material Code": "material_code",
      Destination: "material_destination",
      Quantity: "quantity",
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
