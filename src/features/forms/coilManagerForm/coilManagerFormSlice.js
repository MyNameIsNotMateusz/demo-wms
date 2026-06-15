import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";

export const fetchProductionCoils = createAsyncThunk(
  "coilManagerFormSlice/fetchProductionCoils",
  async (token) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}warehouse/coils/list/?status=IN_USE`,
        {
          headers: DEFAULT_HEADERS(token),
        },
      );

      if (!response.ok) {
        console.error("Error loading production coils:", response.status);
        throw new Error("Failed to load production coils.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching production coils:", error);
      throw error;
    }
  },
);

export const fetchConsumedCoils = createAsyncThunk(
  "coilManagerFormSlice/fetchConsumedCoils",
  async (token) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}warehouse/coils/used/recent/`,
        {
          headers: DEFAULT_HEADERS(token),
        },
      );

      if (!response.ok) {
        console.error("Error loading consumed coils:", response.status);
        throw new Error("Failed to load consumed coils.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching consumed coils:", error);
      throw error;
    }
  },
);

const initialState = {
  productionCoils: [],
  productionCoilsSortConfig: {},
  productionCoilsFilters: {},

  consumedCoils: [],
  consumedCoilsSortConfig: {},
  consumedCoilsFilters: {},

  isLoading: false,
  isError: false,
};

const coilManagerFormSlice = createSlice({
  name: "coilManagerForm",
  initialState,
  reducers: {
    setProductionSortConfig: (state, action) => {
      const index = action.payload;

      if (state.productionCoilsSortConfig[index] == null) {
        state.productionCoilsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.productionCoilsSortConfig[index];

        switch (order) {
          case "asc":
            state.productionCoilsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.productionCoilsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.productionCoilsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setProductionFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.productionCoilsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.productionCoilsFilters = {};
      } else {
        state.productionCoilsFilters = newFilters;
      }
    },
    setConsumedSortConfig: (state, action) => {
      const index = action.payload;

      if (state.consumedCoilsSortConfig[index] == null) {
        state.consumedCoilsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.consumedCoilsSortConfig[index];

        switch (order) {
          case "asc":
            state.consumedCoilsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.consumedCoilsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.consumedCoilsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setConsumedFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.consumedCoilsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.consumedCoilsFilters = {};
      } else {
        state.consumedCoilsFilters = newFilters;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductionCoils.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchProductionCoils.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.productionCoils = action.payload;
      })
      .addCase(fetchProductionCoils.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchConsumedCoils.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchConsumedCoils.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.consumedCoils = action.payload;
      })
      .addCase(fetchConsumedCoils.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default coilManagerFormSlice.reducer;

export const {
  setProductionSortConfig,
  setProductionFilters,
  setConsumedSortConfig,
  setConsumedFilters,
} = coilManagerFormSlice.actions;
