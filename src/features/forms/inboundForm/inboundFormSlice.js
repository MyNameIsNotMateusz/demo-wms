import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";

export const fetchMaterials = createAsyncThunk(
  "inboundFormSlice/fetchMaterials",
  async ({ token, materialSearchModalData }) => {
    try {
      const response = await fetch(`${BASE_API_URL}common/materials/search/`, {
        method: "POST",
        headers: DEFAULT_HEADERS(token),
        body: JSON.stringify(materialSearchModalData),
      });

      if (!response.ok) {
        console.error("Error loading materials:", response.status);
        throw new Error("Failed to load materials.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching materials:", error);
      throw error;
    }
  },
);

const initialState = {
  manualPallets: [],
  manualPalletsSortConfig: {},
  manualPalletsFilters: {},

  plannedDeliveriesSortConfig: {},
  plannedDeliveriesFilters: {},

  deliveryItems: [],
  deliveryItemsSortConfig: {},
  deliveryItemsFilters: {},

  materials: [],
  materialsSortConfig: {},
  materialsFilters: {},

  serviceItems: [],
  serviceItemsSortConfig: {},
  serviceItemsFilters: {},

  isLoading: false,
  isError: false,
};

const inboundFormSlice = createSlice({
  name: "inboundForm",
  initialState,
  reducers: {
    setManualSortConfig: (state, action) => {
      const index = action.payload;

      if (state.manualPalletsSortConfig[index] == null) {
        state.manualPalletsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.manualPalletsSortConfig[index];

        switch (order) {
          case "asc":
            state.manualPalletsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.manualPalletsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.manualPalletsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setManualFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.manualPalletsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.manualPalletsFilters = {};
      } else {
        state.manualPalletsFilters = newFilters;
      }
    },
    updateManualPalletField: (state, action) => {
      const { id, key, value } = action.payload;

      const item = state.manualPallets.find((row) => row.id === id);

      if (item) {
        item[key] = value;
      }
    },
    updateManualPallet: (state, action) => {
      const { id, name, type, unit, material_code, seq_number } =
        action.payload;

      const row = state.manualPallets.find((row) => row.id === id);

      if (row) {
        if (name !== undefined) row.name = name;
        if (type !== undefined) row.type = type;
        if (unit !== undefined) row.unit = unit;
        if (material_code !== undefined) row.material_code = material_code;
        if (seq_number !== undefined) row.seq_number = seq_number;
      }
    },
    addManualPallet: (state, action) => {
      state.manualPallets.unshift(action.payload);
    },
    removeManualPallets: (state, action) => {
      const idsToRemove = action.payload;

      state.manualPallets = state.manualPallets.filter(
        (item) => !idsToRemove.includes(item.id),
      );
    },
    clearManualState: (state) => {
      state.manualPallets = [];
      state.manualPalletsSortConfig = {};
      state.manualPalletsFilters = {};
    },
    setPlannedDeliveriesSortConfig: (state, action) => {
      const index = action.payload;

      if (state.plannedDeliveriesSortConfig[index] == null) {
        state.plannedDeliveriesSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.plannedDeliveriesSortConfig[index];

        switch (order) {
          case "asc":
            state.plannedDeliveriesSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.plannedDeliveriesSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.plannedDeliveriesSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setPlannedDeliveriesFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.plannedDeliveriesFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.plannedDeliveriesFilters = {};
      } else {
        state.plannedDeliveriesFilters = newFilters;
      }
    },
    setDeliveryItemsSortConfig: (state, action) => {
      const index = action.payload;

      if (state.deliveryItemsSortConfig[index] == null) {
        state.deliveryItemsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.deliveryItemsSortConfig[index];

        switch (order) {
          case "asc":
            state.deliveryItemsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.deliveryItemsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.deliveryItemsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setDeliveryItemsFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.deliveryItemsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.deliveryItemsFilters = {};
      } else {
        state.deliveryItemsFilters = newFilters;
      }
    },
    setDeliveryItems: (state, action) => {
      const delivery = action.payload;

      if (!delivery) {
        state.deliveryItems = [];
        return;
      }

      state.deliveryItems = delivery.items.map((item) => ({
        id: item.id,
        seq_number: item.material.seq_number,
        material_code: item.material.material_code,
        name: item.material.name,
        type: item.material.type,
        quantity: Number(item.planned_quantity),
        unit: item.material.unit,
      }));
    },
    updateDeliveryItem: (state, action) => {
      const { id, name, type, unit, material_code, seq_number } =
        action.payload;

      const row = state.deliveryItems.find((row) => row.id === id);

      if (row) {
        if (name !== undefined) row.name = name;
        if (type !== undefined) row.type = type;
        if (unit !== undefined) row.unit = unit;
        if (material_code !== undefined) row.material_code = material_code;
        if (seq_number !== undefined) row.seq_number = seq_number;
      }
    },
    updateDeliveryItemField: (state, action) => {
      const { id, key, value } = action.payload;

      const item = state.deliveryItems.find((row) => row.id === id);

      if (item) {
        item[key] = value;
      }
    },
    addDeliveryItem: (state, action) => {
      state.deliveryItems.unshift(action.payload);
    },
    removeDeliveryItems: (state, action) => {
      const idsToRemove = action.payload;

      state.deliveryItems = state.deliveryItems.filter(
        (item) => !idsToRemove.includes(item.id),
      );
    },
    clearDeliveryItems: (state) => {
      state.deliveryItems = [];
      state.deliveryItemsSortConfig = {};
      state.deliveryItemsFilters = {};
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
    updateServicePallet: (state, action) => {
      const { id, name, type, unit, material_code, seq_number } =
        action.payload;

      const row = state.serviceItems.find((row) => row.id === id);

      if (row) {
        if (name !== undefined) row.name = name;
        if (type !== undefined) row.type = type;
        if (unit !== undefined) row.unit = unit;
        if (material_code !== undefined) row.material_code = material_code;
        if (seq_number !== undefined) row.seq_number = seq_number;
      }
    },
    updateServiceItemField: (state, action) => {
      const { id, key, value } = action.payload;

      const item = state.serviceItems.find((row) => row.id === id);

      if (item) {
        item[key] = value;
      }
    },
    setServiceSortConfig: (state, action) => {
      const index = action.payload;

      if (state.serviceItemsSortConfig[index] == null) {
        state.serviceItemsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.serviceItemsSortConfig[index];

        switch (order) {
          case "asc":
            state.serviceItemsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.serviceItemsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.serviceItemsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setServiceFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.serviceItemsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.serviceItemsFilters = {};
      } else {
        state.serviceItemsFilters = newFilters;
      }
    },
    addServiceItem: (state, action) => {
      state.serviceItems.unshift(action.payload);
    },
    removeServiceItems: (state, action) => {
      const idsToRemove = action.payload;

      state.serviceItems = state.serviceItems.filter(
        (item) => !idsToRemove.includes(item.id),
      );
    },
    clearServiceState: (state) => {
      state.serviceItems = [];
      state.serviceItemsSortConfig = {};
      state.serviceItemsFilters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.materials = action.payload;
      })
      .addCase(fetchMaterials.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default inboundFormSlice.reducer;

export const {
  setManualSortConfig,
  setManualFilters,
  updateManualPalletField,
  updateManualPallet,
  addManualPallet,
  removeManualPallets,
  clearManualState,
  setPlannedDeliveriesSortConfig,
  setPlannedDeliveriesFilters,
  setDeliveryItemsSortConfig,
  setDeliveryItemsFilters,
  setDeliveryItems,
  updateDeliveryItem,
  updateDeliveryItemField,
  addDeliveryItem,
  removeDeliveryItems,
  clearDeliveryItems,
  setMaterialsSortConfig,
  setMaterialsFilters,
  updateServicePallet,
  setServiceSortConfig,
  setServiceFilters,
  updateServiceItemField,
  addServiceItem,
  removeServiceItems,
  clearServiceState,
} = inboundFormSlice.actions;
