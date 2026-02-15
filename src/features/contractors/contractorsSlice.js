import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../api/config";

export const fetchContractors = createAsyncThunk(
  "contractorsSlice/fetchContractors",
  async (token) => {
    try {
      const response = await fetch(`${BASE_API_URL}common/contractors/`, {
        headers: DEFAULT_HEADERS(token),
      });

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
  contractors: [],
  isLoading: false,
  isError: false,
};

export const contractorsSlice = createSlice({
  name: "contractors",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContractors.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchContractors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.contractors = action.payload;
      })
      .addCase(fetchContractors.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default contractorsSlice.reducer;
