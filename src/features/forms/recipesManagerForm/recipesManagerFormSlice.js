import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipeMaterials: [],
  recipeMaterialsSortConfig: {},
  recipeMaterialsFilters: {},
};

const recipesManagerFormSlice = createSlice({
  name: "recipesManagerForm",
  initialState,
  reducers: {
    setRecipeMaterialsSortConfig: (state, action) => {
      const index = action.payload;

      if (state.recipeMaterialsSortConfig[index] == null) {
        state.recipeMaterialsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.recipeMaterialsSortConfig[index];

        switch (order) {
          case "asc":
            state.recipeMaterialsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.recipeMaterialsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.recipeMaterialsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setRecipeMaterialsFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.recipeMaterialsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.recipeMaterialsFilters = {};
      } else {
        state.recipeMaterialsFilters = newFilters;
      }
    },
    setRecipeMaterials: (state, action) => {
      state.recipeMaterials = action.payload;
    },
    updateRecipeMaterial: (state, action) => {
      const { id, key, value, materials, selectedProcess } = action.payload;

      const currentProcess = state.recipeMaterials.find(
        (p) => p.process === selectedProcess,
      );

      if (!currentProcess) return;

      const item = currentProcess.inputs.find(
        (row) => row.material_code === id,
      );

      if (!item) return;

      item[key] = value;

      if (key === "material_code") {
        const newMaterial = materials.find((m) => m.material_code === value);

        item.type = newMaterial ? newMaterial.type : null;
      }
    },
    updateRecipeQuantity: (state, action) => {
      const { id, value, selectedProcess } = action.payload;

      const currentProcess = state.recipeMaterials.find(
        (p) => p.process === selectedProcess,
      );

      if (!currentProcess) return;

      const item = currentProcess.inputs.find(
        (row) => row.material_code === id,
      );

      if (!item) return;

      item.quantity = value;
    },
    addRecipeMaterial: (state, action) => {
      const {
        material_code,
        type,
        selectedProcess,
        alternative_group = null,
      } = action.payload;

      if (!selectedProcess) return;

      const processEntry = state.recipeMaterials.find(
        (item) => item.process === selectedProcess,
      );

      const newMaterial = {
        material_code,
        type,
        quantity: 1,
        alternative_group,
      };

      if (processEntry) {
        processEntry.inputs.unshift(newMaterial);
      } else {
        state.recipeMaterials.push({
          process: selectedProcess,
          inputs: [newMaterial],
        });
      }
    },
    removeRecipeMaterial: (state, action) => {
      const { ids, selectedProcess } = action.payload;

      const currentProcess = state.recipeMaterials.find(
        (p) => p.process === selectedProcess,
      );

      if (!currentProcess) return;

      currentProcess.inputs = currentProcess.inputs.filter(
        (item) => !ids.includes(item.material_code),
      );
    },
    resetRecipeMaterialsState: (state) => {
      state.recipeMaterials = [];
      state.recipeMaterialsSortConfig = {};
      state.recipeMaterialsFilters = {};
    },
  },
});

export default recipesManagerFormSlice.reducer;

export const {
  setRecipeMaterialsSortConfig,
  setRecipeMaterialsFilters,
  setRecipeMaterials,
  updateRecipeMaterial,
  updateRecipeQuantity,
  addRecipeMaterial,
  removeRecipeMaterial,
  resetRecipeMaterialsState,
} = recipesManagerFormSlice.actions;
