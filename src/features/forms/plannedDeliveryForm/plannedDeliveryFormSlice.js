import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deliveryItemsRows: [],
  deliveryItemsSortConfig: {},
  deliveryItemsFilters: {},
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
  },
});

export default plannedDeliveryFormSlice.reducer;

export const { setDeliveryItemsSortConfig, setDeliveryItemsFilters } =
  plannedDeliveryFormSlice.actions;
