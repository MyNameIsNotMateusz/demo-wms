import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../api/config";

export const fetchMaterials = createAsyncThunk(
  "materialsSlice/fetchMaterials",
  async (token) => {
    try {
      const response = await fetch(`${BASE_API_URL}common/materials/`, {
        headers: DEFAULT_HEADERS(token),
      });

      if (!response.ok) {
        console.error("Error loading materials:", response.status);
        throw new Error("Failed to load materials.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching materials:", error);
      throw error;
    }
  },
);

const initialState = {
  materials: [],
  isLoading: false,
  isError: false,
};

export const materialsSlice = createSlice({
  name: "materials",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.materials = action.payload;
      })
      .addCase(fetchMaterials.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default materialsSlice.reducer;
