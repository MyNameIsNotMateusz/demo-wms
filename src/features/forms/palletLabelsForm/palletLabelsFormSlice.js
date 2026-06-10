import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";

export const fetchPallets = createAsyncThunk(
  "palletLabelsFormSlice/fetchPallets",
  async (token) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}warehouse/pallets/details/filter-by-status/`,
        {
          method: "POST",
          headers: DEFAULT_HEADERS(token),
          body: JSON.stringify({
            statuses: ["ok", "hold", "blocked"],
          }),
        },
      );

      if (!response.ok) {
        console.error("Error loading pallets:", response.status);
        throw new Error("Failed to load pallets");
      }

      const data = response.json();
      return data;
    } catch (error) {
      console.error("Error fetching pallets:", error);
      throw error;
    }
  },
);

const initialState = {
  pallets: [],
  palletsSortConfig: {},
  palletsFilters: {},
  isLoading: false,
  isError: false,
};

const palletLabelsFormSlice = createSlice({
  name: "palletLabelsForm",
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPallets.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchPallets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.pallets = action.payload;
      })
      .addCase(fetchPallets.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default palletLabelsFormSlice.reducer;

export const { setPalletsSortConfig, setPalletsFilters } =
  palletLabelsFormSlice.actions;
