import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../api/config";

export const fetchProjects = createAsyncThunk(
  "projectsSlice/fetchProjects",
  async (token) => {
    try {
      const response = await fetch(`${BASE_API_URL}common/projects/`, {
        headers: DEFAULT_HEADERS(token),
      });

      if (!response.ok) {
        console.error("Error loading projects:", response.status);
        throw new Error("Failed to load projects.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },
);

const initialState = {
  projectsList: [],
  isLoading: false,
  isError: false,
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.projectsList = action.payload;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default projectsSlice.reducer;
