import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectSortConfig: {},
  projectFilters: {},
  materialsTable: [],
  materialsSortConfig: {},
  materialsFilters: {},
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
    resetMaterialsTable: (state) => {
      state.materialsTable = [];
    },
    setMaterialsSortConfig: (state, action) => {
      const index = action.payload;

      if (state.materialsSortConfig[index] == null) {
        state.materialsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.materialsSortConfig[index];

        switch (order) {
          case "asc":
            state.materialsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.materialsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.materialsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setMaterialsFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.materialsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.materialsFilters = {};
      } else {
        state.materialsFilters = newFilters;
      }
    },
    updateMaterialRow: (state, action) => {
      const { rowId, key, value } = action.payload;

      const targetRow = state.materialsTable.find(
        (item) => item.rowId === rowId,
      );

      if (targetRow) {
        targetRow[key] = value;
      }
    },
    addNewMaterialRow: (state, action) => {
      const { rowId } = action.payload;

      const newRow = {
        rowId,
        project_code: "",
        material_code: "",
        name: "",
        type: "",
        isEditable: true,
      };

      state.materialsTable.unshift(newRow);
    },
    removeMaterialRow: (state, action) => {
      const idsToRemove = action.payload;

      state.materialsTable = state.materialsTable.filter((item) => {
        const key = item.isEditable ? item.rowId : item.material_code;
        return !idsToRemove.includes(key);
      });
    },
  },
});

export default projectManagementFormSlice.reducer;

export const {
  setProjectSortConfig,
  setProjectFilters,
  setMaterialsTable,
  setMaterialsSortConfig,
  setMaterialsFilters,
  updateMaterialRow,
  addNewMaterialRow,
  removeMaterialRow,
  resetMaterialsTable,
} = projectManagementFormSlice.actions;
