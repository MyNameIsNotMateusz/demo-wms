import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";

export const fetchProjects = createAsyncThunk(
  "stockModificationSlice/fetchProjects",
  async (token) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}common/materials/clients-projects/`,
        {
          headers: DEFAULT_HEADERS(token),
        },
      );

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

export const fetchPallets = createAsyncThunk(
  "stockModificationSlice/fetchPallets",
  async (token) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}warehouse/production/pallets/filter/`,
        {
          method: "POST",
          headers: DEFAULT_HEADERS(token),
          body: JSON.stringify({
            material_codes: ["*"],
            statuses: ["OK", "HOLD", "BLOCKED", "AT_SERVICE"],
          }),
        },
      );

      if (!response.ok) {
        console.error("Error loading projects:", response.status);
        throw new Error("Failed to load projects.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching pallets", error);
      throw error;
    }
  },
);

const initialState = {
  pallets: [],
  palletsSortConfig: {},
  palletsFilters: {},

  removedPallets: [],
  removedPalletsSortConfig: {},
  removedPalletsFilters: {},

  editedPallets: [],
  editedPalletsSortConfig: {},
  editedPalletsFilters: {},

  addedPallets: [],
  addedPalletsSortConfig: {},
  addedPalletsFilters: {},

  clients: [],
  projects: {},
  materialCodes: {},

  isLoading: false,
  isError: false,
};

export const stockModificationFormSlice = createSlice({
  name: "stockModificationForm",
  initialState,
  reducers: {
    setPalletsSortConfig: (state, action) => {
      const index = action.payload;

      if (state.palletsSortConfig[index] == null) {
        state.palletsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.palletsSortConfig[index];

        switch (order) {
          case "asc":
            state.palletsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.palletsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.palletsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setPalletsFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.palletsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.palletsFilters = {};
      } else {
        state.palletsFilters = newFilters;
      }
    },
    setRemovedPalletsSortConfig: (state, action) => {
      const index = action.payload;

      if (state.removedPalletsSortConfig[index] == null) {
        state.removedPalletsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.removedPalletsSortConfig[index];

        switch (order) {
          case "asc":
            state.removedPalletsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.removedPalletsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.removedPalletsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setRemovedPalletsFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.removedPalletsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.removedPalletsFilters = {};
      } else {
        state.removedPalletsFilters = newFilters;
      }
    },
    setEditedPalletsSortConfig: (state, action) => {
      const index = action.payload;

      if (state.editedPalletsSortConfig[index] == null) {
        state.editedPalletsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.editedPalletsSortConfig[index];

        switch (order) {
          case "asc":
            state.editedPalletsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.editedPalletsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.editedPalletsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setEditedPalletsFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.editedPalletsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.editedPalletsFilters = {};
      } else {
        state.editedPalletsFilters = newFilters;
      }
    },
    setAddedPalletsSortConfig: (state, action) => {
      const index = action.payload;

      if (state.addedPalletsSortConfig[index] == null) {
        state.addedPalletsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.addedPalletsSortConfig[index];

        switch (order) {
          case "asc":
            state.addedPalletsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.addedPalletsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.addedPalletsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setAddedPalletsFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.addedPalletsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.addedPalletsFilters = {};
      } else {
        state.addedPalletsFilters = newFilters;
      }
    },
    movePalletsToRemoved: (state, action) => {
      const selectedIds = action.payload;

      const palletsToMove = state.pallets.filter((pallet) =>
        selectedIds.includes(pallet.id),
      );

      state.removedPallets.push(...palletsToMove);

      state.pallets = state.pallets.filter(
        (pallet) => !selectedIds.includes(pallet.id),
      );
    },
    movePalletsToEdited: (state, action) => {
      const selectedIds = action.payload;

      const palletsToMove = state.pallets
        .filter((pallet) => selectedIds.includes(pallet.id))
        .map((pallet) => ({
          ...pallet,
          originalQuantity: pallet.quantity,
          originalStatus: pallet.status,
        }));

      state.editedPallets.push(...palletsToMove);

      state.pallets = state.pallets.filter(
        (pallet) => !selectedIds.includes(pallet.id),
      );
    },
    moveRemovedPalletsToPallets: (state, action) => {
      const selectedIds = action.payload;

      const palletsToMove = state.removedPallets.filter((pallet) =>
        selectedIds.includes(pallet.id),
      );

      state.pallets.push(...palletsToMove);

      state.removedPallets = state.removedPallets.filter(
        (pallet) => !selectedIds.includes(pallet.id),
      );
    },
    updateEditedPallet: (state, action) => {
      const { id, key, value } = action.payload;

      const pallet = state.editedPallets.find((item) => item.id === id);

      if (pallet) {
        pallet[key] = value;
      }
    },
    moveEditedPalletsToPallets: (state, action) => {
      const selectedIds = action.payload;

      const palletsToMove = state.editedPallets
        .filter((pallet) => selectedIds.includes(pallet.id))
        .map(({ originalQuantity, originalStatus, ...pallet }) => pallet);

      state.pallets.push(...palletsToMove);

      state.editedPallets = state.editedPallets.filter(
        (pallet) => !selectedIds.includes(pallet.id),
      );
    },
    removeAddedPallets: (state, action) => {
      const idsToRemove = action.payload;

      state.addedPallets = state.addedPallets.filter(
        (pallet) => !idsToRemove.includes(pallet.unique_id),
      );
    },
    addPalletRow: (state, action) => {
      state.addedPallets.unshift(action.payload);
    },
    updateAddedPallet: (state, action) => {
      const { id, key, value } = action.payload;

      const pallet = state.addedPallets.find((item) => item.unique_id === id);

      if (pallet) {
        pallet[key] = value;
      }
    },
    setProjectsForRow: (state, action) => {
      const { rowId, clientName } = action.payload;

      const foundClient = state.clients.find(
        (client) => client.name === clientName,
      );

      if (foundClient) {
        state.projects[rowId] = foundClient.projects;
      } else {
        delete state.projects[rowId];
      }

      delete state.materialCodes[rowId];
    },
    setMaterialCodesForRow: (state, action) => {
      const { rowId, projectName } = action.payload;

      const foundProject = state.projects[rowId]?.find(
        (project) => project.name === projectName,
      );

      if (foundProject) {
        state.materialCodes[rowId] = foundProject.material_codes;
      } else {
        delete state.materialCodes[rowId];
      }
    },
    clearStockModification: (state) => {
      state.pallets = [];
      state.palletsSortConfig = {};
      state.palletsFilters = {};

      state.removedPallets = [];
      state.removedPalletsSortConfig = {};
      state.removedPalletsFilters = {};

      state.editedPallets = [];
      state.editedPalletsSortConfig = {};
      state.editedPalletsFilters = {};

      state.addedPallets = [];
      state.addedPalletsSortConfig = {};
      state.addedPalletsFilters = {};

      state.projects = {};
      state.materialCodes = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.clients = action.payload.clients;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(fetchPallets.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchPallets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.pallets = action.payload;
      })
      .addCase(fetchPallets.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {
  setPalletsSortConfig,
  setPalletsFilters,
  setRemovedPalletsSortConfig,
  setRemovedPalletsFilters,
  setEditedPalletsSortConfig,
  setEditedPalletsFilters,
  setAddedPalletsSortConfig,
  setAddedPalletsFilters,
  movePalletsToRemoved,
  movePalletsToEdited,
  moveRemovedPalletsToPallets,
  updateEditedPallet,
  moveEditedPalletsToPallets,
  removeAddedPallets,
  addPalletRow,
  updateAddedPallet,
  setProjectsForRow,
  setMaterialCodesForRow,
  clearStockModification,
} = stockModificationFormSlice.actions;

export default stockModificationFormSlice.reducer;
