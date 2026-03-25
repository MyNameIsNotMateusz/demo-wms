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
  isLoading: false,
  isError: false,
};

const createComponentsFormSlice = createSlice({
  name: "createComponentsForm",
  initialState,
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

export default createComponentsFormSlice.reducer;
