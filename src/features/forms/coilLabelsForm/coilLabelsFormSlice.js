import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";

export const fetchPrintedCoils = createAsyncThunk(
  "coilLabelsFormSlice/fetchPrintedCoils",
  async (token) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}warehouse/coils/list/?status=IN_USE,OK,HOLD`,
        {
          headers: DEFAULT_HEADERS(token),
        },
      );

      if (!response.ok) {
        console.error("Error loading printed coils:", response.status);
        throw new Error("Failed to load printed coils");
      }

      const data = response.json();
      return data;
    } catch (error) {
      console.error("Error fetch printed coils:", error);
      throw error;
    }
  },
);

const initialState = {
  printedCoils: [],
  printedCoilsSortConfig: {},
  printedCoilsFilters: {},
  isLoading: false,
  isError: false,
};

const coilLabelsFormSlice = createSlice({
  name: "coilLabelsForm",
  initialState,
  reducers: {
    setCoilsSortConfig: (state, action) => {
      const index = action.payload;

      if (state.printedCoilsSortConfig[index] == null) {
        state.printedCoilsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.printedCoilsSortConfig[index];

        switch (order) {
          case "asc":
            state.printedCoilsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.printedCoilsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.printedCoilsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setCoilsFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.printedCoilsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.printedCoilsFilters = {};
      } else {
        state.printedCoilsFilters = newFilters;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrintedCoils.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchPrintedCoils.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.printedCoils = action.payload;
      })
      .addCase(fetchPrintedCoils.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default coilLabelsFormSlice.reducer;

export const { setCoilsSortConfig, setCoilsFilters } =
  coilLabelsFormSlice.actions;
