import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import logisticsStockReducer from "../features/tables/logisticsStock/logisticsStockSlice";
import contractorsReducer from "../features/dictionaries/contractorsSlice";
import plannedDeliveryReducer from "../features/dictionaries/plannedDeliverySlice";
import plannedDeliveryFormReducer from "../features/forms/plannedDeliveryForm/plannedDeliveryFormSlice";

export default configureStore({
  reducer: {
    contractors: contractorsReducer,
    plannedDelivery: plannedDeliveryReducer,
    plannedDeliveryForm: plannedDeliveryFormReducer,
    logisticsStock: logisticsStockReducer,
    auth: authReducer,
  },
});
