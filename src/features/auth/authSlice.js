import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  tabsAccess: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.user = action.payload.user;
      const tabsAccess = [
        {
          code: "warehouse",
          subtabs: {
            repack_pallet: true,
            inventory_change: true,
            create_components: true,
            print_label: true,
            coil_manager: true,
            coil_label_printer: true,
            outbound: true,
            inbound: true,
            planned_delivery: true,
            outbound_delivery_note: true,
            coil_inventory_change: true,
            sheet_logistic_stock: true,
            sheet_production_stock: true,
            sheet_coil_stock: true,
            sheet_service_stock: true,
            sheet_coil_transaction: true,
            sheet_ckd_stock: true,
            sheet_production_transaction: true,
          },
        },
        {
          code: "settings",
          subtabs: {
            user_management: true,
            contractor_management: true,
            change_password: true,
            material_management: true,
            project_management: true,
            recipes_manager: true,
          },
        },
        {
          code: "quality",
          subtabs: {
            pallet_quality: true,
            coil_quality: true,
          },
        },
      ];
      // state.tabsAccess = action.payload.tabs_access;
      state.tabsAccess = tabsAccess;
    },
    clearAuthData: (state) => {
      state.user = {};
      state.tabsAccess = [];
    },
  },
});

export default authSlice.reducer;
export const { setAuthData, clearAuthData } = authSlice.actions;
