import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  materialSortConfig: {},
  materialFilters: {},
  isLoading: false,
  isError: false,
};

const materialManagementFormSlice = createSlice({
  name: "materialManagementForm",
  initialState,
  reducers: {
    setMaterialSortConfig: (state, action) => {
      const index = action.payload;

      if (state.materialSortConfig[index] == null) {
        state.materialSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.materialSortConfig[index];

        switch (order) {
          case "asc":
            state.materialSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.materialSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.materialSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setMaterialFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.materialFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.materialFilters = {};
      } else {
        state.materialFilters = newFilters;
      }
    },
  },
});

export default materialManagementFormSlice.reducer;

export const {
  setMaterialSortConfig,
  setMaterialFilters,
} = materialManagementFormSlice.actions;
