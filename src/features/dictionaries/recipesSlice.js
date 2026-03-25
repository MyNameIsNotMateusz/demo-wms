import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../api/config";

export const fetchRecipes = createAsyncThunk(
  "recipesSlice/fetchRecipes",
  async (token) => {
    try {
      const response = await fetch(`${BASE_API_URL}common/recipes/all/`, {
        headers: DEFAULT_HEADERS(token),
      });

      if (!response.ok) {
        console.error("Error loading recipes:", response.status);
        throw new Error("Failed to load recipes.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      throw error;
    }
  },
);

const initialState = {
  recipes: [],
  isLoading: false,
  isError: false,
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default recipesSlice.reducer;
