import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shipments: [],
  shipmentsSortConfig: {},
  shipmentsFilters: {},
  editableShipmentData: [],
  editableShipmentSortConfig: {},
  editableShipmentFilters: {},
};

const wzDocumentsFormSlice = createSlice({
  name: "wzDocumentsForm",
  initialState,
  reducers: {
    setShipmentsSortConfig: (state, action) => {
      const index = action.payload;

      if (state.shipmentsSortConfig[index] == null) {
        state.shipmentsSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.shipmentsSortConfig[index];

        switch (order) {
          case "asc":
            state.shipmentsSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.shipmentsSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.shipmentsSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setShipmentsFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.shipmentsFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.shipmentsFilters = {};
      } else {
        state.shipmentsFilters = newFilters;
      }
    },
    setShipments: (state, action) => {
      const shipments = action.payload;

      state.shipments = shipments;
    },
    setEditableShipmentsSortConfig: (state, action) => {
      const index = action.payload;

      if (state.editableShipmentSortConfig[index] == null) {
        state.editableShipmentSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.editableShipmentSortConfig[index];

        switch (order) {
          case "asc":
            state.editableShipmentSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.editableShipmentSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.editableShipmentSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setEditableShipmentsFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.editableShipmentFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.editableShipmentFilters = {};
      } else {
        state.editableShipmentFilters = newFilters;
      }
    },
    setEditableShipmentData: (state, action) => {
      const documentNumber = action.payload;

      if (!documentNumber) {
        state.editableShipmentData = [];
        return;
      }

      const shipment = state.shipments.find(
        ({ document_number }) => document_number === documentNumber,
      );

      state.editableShipmentData = shipment?.pallets || [];
    },
    resetShipmentsState: (state) => {
      state.shipments = [];
      state.shipmentsSortConfig = {};
      state.shipmentsFilters = {};
    },
    updateEditableShipmentRow: (state, action) => {
      const { rowId, ...data } = action.payload;

      const row = state.editableShipmentData.find((r) => r.id === rowId);

      if (row) {
        row.pallet = data.pallet;
        row.material_code = data.material_code;
        row.material_name = data.material_name;
        row.material_type = data.material_type;
        row.quantity = data.quantity;
      }
    },
    updateEditableShipmentField: (state, action) => {
      const { id, key, value } = action.payload;

      const row = state.editableShipmentData.find((row) => row.pallet === id);

      if (row) {
        row[key] = value;
      }
    },
    addEditableShipmentRow: (state, action) => {
      state.editableShipmentData.unshift(action.payload);
    },
    removeEditableShipmentRows: (state, action) => {
      const idsToRemove = action.payload;

      state.editableShipmentData = state.editableShipmentData.filter(
        (row) => !idsToRemove.includes(row.id || row.pallet),
      );
    },
    resetEditableShipmentsState: (state, action) => {
      const shipmentDocumentNumber = action.payload;

      const selected = state.shipments.find(
        ({ document_number }) => document_number === shipmentDocumentNumber,
      );

      state.editableShipmentData = selected?.pallets || [];

      state.editableShipmentSortConfig = {};
      state.editableShipmentFilters = {};
    },
  },
});

export default wzDocumentsFormSlice.reducer;

export const {
  setShipments,
  setShipmentsSortConfig,
  setShipmentsFilters,
  setEditableShipmentsSortConfig,
  setEditableShipmentsFilters,
  setEditableShipmentData,
  resetShipmentsState,
  updateEditableShipmentRow,
  updateEditableShipmentField,
  addEditableShipmentRow,
  removeEditableShipmentRows,
  resetEditableShipmentsState,
} = wzDocumentsFormSlice.actions;
