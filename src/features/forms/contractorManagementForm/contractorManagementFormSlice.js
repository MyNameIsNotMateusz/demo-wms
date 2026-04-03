import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";

const initialState = {
  contractorSortConfig: {},
  contractorFilters: {},
  isLoading: false,
  isError: false,
};

const contractorManagementFormSlice = createSlice({
  name: "contractorManagementForm",
  initialState,
  reducers: {
    setContractorSortConfig: (state, action) => {
      const index = action.payload;

      if (state.contractorSortConfig[index] == null) {
        state.contractorSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.contractorSortConfig[index];

        switch (order) {
          case "asc":
            state.contractorSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.contractorSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.contractorSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setContractorFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.contractorFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.contractorFilters = {};
      } else {
        state.contractorFilters = newFilters;
      }
    },
  },
});

export default contractorManagementFormSlice.reducer;

export const { setContractorSortConfig, setContractorFilters } =
  contractorManagementFormSlice.actions;
