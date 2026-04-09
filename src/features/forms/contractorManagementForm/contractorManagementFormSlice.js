import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contractorSortConfig: {},
  contractorFilters: {},
  projects: [],
  projectsSortConfig: {},
  projectsFilters: {},
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
    setProjectsSortConfig: (state, action) => {
      const index = action.payload;

      if (state.projectsSortConfig[index] == null) {
        state.projectsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.projectsSortConfig[index];

        switch (order) {
          case "asc":
            state.projectsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.projectsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.projectsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setProjectsFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.projectsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.projectsFilters = {};
      } else {
        state.projectsFilters = newFilters;
      }
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    addNewProjectRow: (state, action) => {
      const { rowId } = action.payload;

      const newRow = {
        rowId,
        project_code: "",
        name: "",
        type: "",
        isEditable: true,
      };

      state.projects.unshift(newRow);
    },
    resetProjects: (state) => {
      state.projects = [];
    },
    removeProjectRow: (state, action) => {
      const idsToRemove = action.payload;
      state.projects = state.projects.filter((item) => {
        const key = item.isEditable ? item.rowId : item.project_code;
        return !idsToRemove.includes(key);
      });
    },
    updateProjectRow: (state, action) => {
      const { rowId, key, value } = action.payload;

      const targetRow = state.projects.find((item) => item.rowId === rowId);

      if (targetRow) {
        targetRow[key] = value;
      }
    },
  },
});

export default contractorManagementFormSlice.reducer;

export const {
  setContractorSortConfig,
  setContractorFilters,
  setProjects,
  setProjectsSortConfig,
  setProjectsFilters,
  addNewProjectRow,
  resetProjects,
  removeProjectRow,
  updateProjectRow,
} = contractorManagementFormSlice.actions;
