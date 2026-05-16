import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";

export const fetchCoils = createAsyncThunk(
  "createComponentsFormSlice/fetchCoils",
  async (token) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}warehouse/coils/component_creator/`,
        {
          headers: DEFAULT_HEADERS(token),
        },
      );

      if (!response.ok) {
        console.error("Error loading coils:", response.status);
        throw new Error("Failed to load coils.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching coils:", error);
      throw error;
    }
  },
);

const initialState = {
  coils: [],
  createdPallets: [],
  createdPalletsSortConfig: {},
  createdPalletsFilters: {},
  requiredMaterialsStock: [],
  requiredMaterialsSortConfig: {},
  requiredMaterialsFilters: {},
  isLoading: false,
  isError: false,
};

const createComponentsFormSlice = createSlice({
  name: "createComponentsForm",
  initialState,
  reducers: {
    setRequiredMaterialsStock: (state, action) => {
      state.requiredMaterialsStock = action.payload;
    },
    setCreatedPalletsSortConfig: (state, action) => {
      const index = action.payload;

      if (state.createdPalletsSortConfig[index] == null) {
        state.createdPalletsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.createdPalletsSortConfig[index];

        switch (order) {
          case "asc":
            state.createdPalletsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.createdPalletsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.createdPalletsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setCreatedPalletsFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.createdPalletsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.createdPalletsFilters = {};
      } else {
        state.createdPalletsFilters = newFilters;
      }
    },
    updateCreatedPalletField: (state, action) => {
      const { id, key, value } = action.payload;

      const row = state.createdPallets.find((row) => row.id === id);

      if (row) {
        row[key] = value;
      }
    },
    addCreatedPalletRow: (state, action) => {
      state.createdPallets.unshift(action.payload);
    },
    removeCreatedPalletRows: (state, action) => {
      const idsToRemove = action.payload;

      state.createdPallets = state.createdPallets.filter(
        (row) => !idsToRemove.includes(row.id),
      );
    },
    clearCreatedPallets: (state) => {
      state.createdPallets = [];
    },
    updateRequiredMaterialOption: (state, action) => {
      const { currentMaterialCode, newMaterialCode } = action.payload;

      const stockItem = state.requiredMaterialsStock.find(
        (item) => item.material_code === currentMaterialCode,
      );

      if (!stockItem || !stockItem.options) {
        return;
      }

      if (newMaterialCode === "") {
        stockItem.material_code = "";

        stockItem.quantity = null;

        stockItem.availableQuantity = null;

        return;
      }

      const newOption = stockItem.options.find(
        (opt) => opt.material_code === newMaterialCode,
      );

      if (newOption) {
        stockItem.material_code = newOption.material_code;

        stockItem.quantity = newOption.quantity;

        stockItem.availableQuantity = newOption.availableQuantity;
      }
    },
    setRequiredMaterialsSortConfig: (state, action) => {
      const index = action.payload;

      if (state.requiredMaterialsSortConfig[index] == null) {
        state.requiredMaterialsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.requiredMaterialsSortConfig[index];

        switch (order) {
          case "asc":
            state.requiredMaterialsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.requiredMaterialsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.requiredMaterialsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setRequiredMaterialsFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.requiredMaterialsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.requiredMaterialsFilters = {};
      } else {
        state.requiredMaterialsFilters = newFilters;
      }
    },
    clearProductionData: (state) => {
      state.createdPallets = [];
      state.createdPalletsSortConfig = {};
      state.createdPalletsFilters = {};

      state.requiredMaterialsStock = [];
      state.requiredMaterialsSortConfig = {};
      state.requiredMaterialsFilters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoils.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchCoils.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.coils = action.payload;
      })
      .addCase(fetchCoils.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {
  setRequiredMaterialsStock,
  setCreatedPalletsSortConfig,
  setCreatedPalletsFilters,
  updateCreatedPalletField,
  addCreatedPalletRow,
  removeCreatedPalletRows,
  clearCreatedPallets,
  setRequiredMaterialsSortConfig,
  setRequiredMaterialsFilters,
  updateRequiredMaterialOption,
  clearProductionData,
} = createComponentsFormSlice.actions;

export default createComponentsFormSlice.reducer;
