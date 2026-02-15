import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../api/config";

export const fetchPlannedDeliveries = createAsyncThunk(
  "plannedDeliverySlice/fetchPlannedDeliveries",
  async (token) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}warehouse/logistics/planned_inbound/list/?status=APPROVED`,
        {
          headers: DEFAULT_HEADERS(token),
        },
      );

      if (!response.ok) {
        console.error("Error loading contractors:", response.status);
        throw new Error("Failed to load contractors.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching contractors:", error);
      throw error;
    }
  },
);

const initialState = {
  plannedDeliveries: [],
  isLoading: false,
  isError: false,
};

export const plannedDeliverySlice = createSlice({
  name: "plannedDelivery",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlannedDeliveries.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchPlannedDeliveries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.plannedDeliveries = action.payload;
      })
      .addCase(fetchPlannedDeliveries.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default plannedDeliverySlice.reducer;
