import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../api/config";

export const fetchLogisticsStock = createAsyncThunk(
  "logisticsStock/fetchLogisticsStock",
  async (token) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}warehouse/tables/logistic/`,
        {
          headers: DEFAULT_HEADERS(token),
        },
      );

      if (!response.ok) {
        console.error("Wystąpił błąd przy ładowaniu danych.", response.status);
        throw new Error("Nie udało się załadować danych.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "Wystąpił błąd podczas pobierania danych do tabeli...",
        error,
      );
      throw error;
    }
  },
);

const initialState = {
  columns: [
    "Pallet ID",
    "Material Code",
    "Material Name",
    "Type",
    "Quantity",
    "Unit",
    "Status",
    "Destination",
    "Created At",
  ],
  rows: [],
  sortConfig: {},
  filters: {},
  isLoading: null,
  isError: false,
};

const logisticsStockSlice = createSlice({
  name: "logisticsStock",
  initialState,
  reducers: {
    setSortConfig: (state, action) => {
      const index = action.payload;

      if (state.sortConfig[index] == null) {
        state.sortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.sortConfig[index];

        switch (order) {
          case "asc":
            state.sortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.sortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.sortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.filters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.filters = {};
      } else {
        state.filters = newFilters;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogisticsStock.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchLogisticsStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.rows = action.payload;
      })
      .addCase(fetchLogisticsStock.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default logisticsStockSlice.reducer;
export const { setSortConfig, setFilters } = logisticsStockSlice.actions;
