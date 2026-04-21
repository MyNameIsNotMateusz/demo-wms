import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import logisticsStockReducer from "../features/tables/logisticsStock/logisticsStockSlice";
import contractorsReducer from "../features/dictionaries/contractorsSlice";
import plannedDeliveriesReducer from "../features/dictionaries/plannedDeliveriesSlice";
import plannedDeliveryFormReducer from "../features/forms/plannedDeliveryForm/plannedDeliveryFormSlice";
import recipesReducer from "../features/dictionaries/recipesSlice";
import createComponentsFormReducer from "../features/forms/createComponentsForm/createComponentsFormSlice";
import userManagementFormReducer from "../features/forms/userManagementForm/userManagementFormSlice";
import contractorManagementFormReducer from "../features/forms/contractorManagementForm/contractorManagementFormSlice";
import projectsReducer from "../features/dictionaries/projectsSlice";
import materialsReducer from "../features/dictionaries/materialsSlice";
import materialManagementFormReducer from "../features/forms/materialManagement/materialManagementFormSlice";
import projectManagementFormReducer from "../features/forms/projectManagementForm/projectManagementFormSlice";
import recipesManagerFormReducer from "../features/forms/recipesManagerForm/recipesManagerFormSlice";

export default configureStore({
  reducer: {
    materials: materialsReducer,
    recipes: recipesReducer,
    contractors: contractorsReducer,
    projects: projectsReducer,
    plannedDeliveries: plannedDeliveriesReducer,
    recipesManagerForm: recipesManagerFormReducer,
    projectManagementForm: projectManagementFormReducer,
    materialManagementForm: materialManagementFormReducer,
    contractorManagementForm: contractorManagementFormReducer,
    userManagementForm: userManagementFormReducer,
    plannedDeliveryForm: plannedDeliveryFormReducer,
    createComponentsForm: createComponentsFormReducer,
    logisticsStock: logisticsStockReducer,
    auth: authReducer,
  },
});
