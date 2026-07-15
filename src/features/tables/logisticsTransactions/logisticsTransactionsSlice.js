import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DEFAULT_HEADERS, BASE_API_URL } from "../../../api/config";

export const fetchLogisticsTransactions = createAsyncThunk(
  "logisticsTransactions/fetchLogisticsTransactions",
  async (token) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}warehouse/tables/logistic/transactions/`,
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
  rows: [],
  sortConfig: {},
  filters: {},
  isLoading: null,
  isError: false,
};

const logisticsTransactionsSlice = createSlice({
  name: "logisticsTransactions",
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
      .addCase(fetchLogisticsTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchLogisticsTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.rows = action.payload.map((item) => ({
          transaction_date: item.transaction_date,
          direction: item.direction,
          transaction_type: item.transaction_type,
          document_number: item.document_number,
          contractor_name: item.contractor_name,
          pallet_id: item.pallet_id,
          material_name: item.material_name,
          material_type: item.material_type,
          quantity: item.quantity,
          unit: item.unit,
          creator_name: item.creator_name,
        }));
      })
      .addCase(fetchLogisticsTransactions.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default logisticsTransactionsSlice.reducer;
export const { setSortConfig, setFilters } = logisticsTransactionsSlice.actions;
