import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectSortConfig: {},
  projectFilters: {},
  materialsTable: [],
  isLoading: false,
  isError: false,
};

const projectManagementFormSlice = createSlice({
  name: "projectManagementForm",
  initialState,
  reducers: {
    setProjectSortConfig: (state, action) => {
      const index = action.payload;

      if (state.projectSortConfig[index] == null) {
        state.projectSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.projectSortConfig[index];

        switch (order) {
          case "asc":
            state.projectSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.projectSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.projectSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setProjectFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.projectFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.projectFilters = {};
      } else {
        state.projectFilters = newFilters;
      }
    },
    setMaterialsTable: (state, action) => {
      state.materialsTable = action.payload;
    },
  },
});

export default projectManagementFormSlice.reducer;

export const { setProjectSortConfig, setProjectFilters, setMaterialsTable } =
  projectManagementFormSlice.actions;
