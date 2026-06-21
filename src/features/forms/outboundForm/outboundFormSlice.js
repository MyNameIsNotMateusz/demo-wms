import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pallets: [],
  palletsSortConfig: {},
  palletsFilters: {},

  selectedPallets: [],
  selectedPalletsSortConfig: {},
  selectedPalletsFilters: {},

  isLoading: false,
  isError: false,
};

const outboundFormSlice = createSlice({
  name: "outboundForm",
  initialState,
  reducers: {
    setPalletsSortConfig: (state, action) => {
      const index = action.payload;

      if (state.palletsSortConfig[index] == null) {
        state.palletsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.palletsSortConfig[index];

        switch (order) {
          case "asc":
            state.palletsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.palletsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.palletsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setPalletsFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.palletsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.palletsFilters = {};
      } else {
        state.palletsFilters = newFilters;
      }
    },
    setSelectedSortConfig: (state, action) => {
      const index = action.payload;

      if (state.selectedPalletsSortConfig[index] == null) {
        state.selectedPalletsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.selectedPalletsSortConfig[index];

        switch (order) {
          case "asc":
            state.selectedPalletsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.selectedPalletsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.selectedPalletsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setSelectedFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.selectedPalletsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.selectedPalletsFilters = {};
      } else {
        state.selectedPalletsFilters = newFilters;
      }
    },
    setPallets: (state, action) => {
      state.pallets = action.payload;
    },
    setSelectedPalletsData: (state, action) => {
      state.selectedPallets = state.pallets.filter((pallet) =>
        action.payload.includes(pallet.pallet_id),
      );
    },
    clearState: (state) => {
      state.pallets = [];
      state.palletsSortConfig = {};
      state.palletsFilters = {};

      state.selectedPallets = [];
      state.selectedPalletsSortConfig = {};
      state.selectedPalletsFilters = {};
    },
  },
});

export default outboundFormSlice.reducer;

export const {
  setPallets,
  setSelectedPalletsData,
  setPalletsSortConfig,
  setPalletsFilters,
  setSelectedSortConfig,
  setSelectedFilters,
  clearState,
} = outboundFormSlice.actions;
