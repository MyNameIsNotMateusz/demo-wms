import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import logisticsStockReducer from "../features/logisticsStock/logisticsStockSlice";

export default configureStore({
  reducer: {
    logisticsStock: logisticsStockReducer,
    auth: authReducer,
  },
});
