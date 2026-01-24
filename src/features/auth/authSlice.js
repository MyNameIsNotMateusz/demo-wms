import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    tabsAccess: [],
  },
  reducers: {
    setAuthData: (state, action) => {
      state.user = action.payload.user;
      state.tabsAccess = action.payload.tabs_access;
    },
    clearAuthData: (state) => {
      state.user = {};
      state.tabsAccess = [];
    },
  },
});

export default authSlice.reducer;
export const { setAuthData, clearAuthData } = authSlice.actions;
