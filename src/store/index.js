import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import logisticsStockReducer from "../features/logisticsStock/logisticsStockSlice";
import contractorsReducer from "../features/contractors/contractorsSlice";
import plannedDeliveryReducer from "../features/plannedDelivery/plannedDeliverySlice";

export default configureStore({
  reducer: {
    contractors: contractorsReducer,
    plannedDelivery: plannedDeliveryReducer,
    logisticsStock: logisticsStockReducer,
    auth: authReducer,
  },
});
