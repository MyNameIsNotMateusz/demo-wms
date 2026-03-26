import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import logisticsStockReducer from "../features/tables/logisticsStock/logisticsStockSlice";
import contractorsReducer from "../features/dictionaries/contractorsSlice";
import plannedDeliveryReducer from "../features/dictionaries/plannedDeliverySlice";
import plannedDeliveryFormReducer from "../features/forms/plannedDeliveryForm/plannedDeliveryFormSlice";
import recipesReducer from "../features/dictionaries/recipesSlice";
import createComponentsFormReducer from "../features/forms/createComponentsForm/createComponentsFormSlice";
import userManagementFormReducer from "../features/forms/userManagementForm/userManagementFormSlice";

export default configureStore({
  reducer: {
    recipes: recipesReducer,
    contractors: contractorsReducer,
    plannedDelivery: plannedDeliveryReducer,
    userManagementForm: userManagementFormReducer,
    plannedDeliveryForm: plannedDeliveryFormReducer,
    createComponentsForm: createComponentsFormReducer,
    logisticsStock: logisticsStockReducer,
    auth: authReducer,
  },
});
