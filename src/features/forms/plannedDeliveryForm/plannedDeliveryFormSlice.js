import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deliveryItemsRows: [],
  deliveryItemsSortConfig: {},
  deliveryItemsFilters: {},
  plannedDeliveriesRows: [],
  plannedDeliveriesSortConfig: {},
  plannedDeliveriesFilters: {},
};

const plannedDeliveryFormSlice = createSlice({
  name: "plannedDeliveryForm",
  initialState,
  reducers: {
    setDeliveryItemsSortConfig: (state, action) => {
      const index = action.payload;

      if (state.deliveryItemsSortConfig[index] == null) {
        state.deliveryItemsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.deliveryItemsSortConfig[index];

        switch (order) {
          case "asc":
            state.deliveryItemsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.deliveryItemsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.deliveryItemsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setDeliveryItemsFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.deliveryItemsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.deliveryItemsFilters = {};
      } else {
        state.deliveryItemsFilters = newFilters;
      }
    },
    updateDeliveryItems: (state, action) => {
      const { id, key, value } = action.payload;

      const item = state.deliveryItemsRows.find((row) => row.id === id);

      if (item) {
        item[key] = value;
      }
    },
    addDeliveryItemRow: (state, action) => {
      state.deliveryItemsRows.unshift(action.payload);
    },
    removeDeliveryItems: (state, action) => {
      const idsToRemove = action.payload;
      state.deliveryItemsRows = state.deliveryItemsRows.filter(
        (item) => !idsToRemove.includes(item.id),
      );
    },
    applyMaterialLookupData: (state, action) => {
      const { id, name, type, unit, material_code, seq_number } =
        action.payload;

      const row = state.deliveryItemsRows.find((row) => row.id === id);
      if (row) {
        if (name !== undefined) row.name = name;
        if (type !== undefined) row.type = type;
        if (unit !== undefined) row.unit = unit;
        if (material_code !== undefined) row.material_code = material_code;
        if (seq_number !== undefined) row.seq_number = seq_number;
      }
    },
    setPlannedDeliveriesSortConfig: (state, action) => {
      const index = action.payload;

      if (state.plannedDeliveriesSortConfig[index] == null) {
        state.plannedDeliveriesSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.plannedDeliveriesSortConfig[index];

        switch (order) {
          case "asc":
            state.plannedDeliveriesSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.plannedDeliveriesSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.plannedDeliveriesSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setPlannedDeliveriesFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.plannedDeliveriesFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.plannedDeliveriesFilters = {};
      } else {
        state.plannedDeliveriesFilters = newFilters;
      }
    },
  },
});

export default plannedDeliveryFormSlice.reducer;

export const {
  setDeliveryItemsSortConfig,
  setDeliveryItemsFilters,
  updateDeliveryItems,
  addDeliveryItemRow,
  removeDeliveryItems,
  applyMaterialLookupData,
  setPlannedDeliveriesSortConfig,
  setPlannedDeliveriesFilters,
} = plannedDeliveryFormSlice.actions;
