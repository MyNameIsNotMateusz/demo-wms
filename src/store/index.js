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
import materialManagementFormReducer from "../features/forms/materialManagementForm/materialManagementFormSlice";
import projectManagementFormReducer from "../features/forms/projectManagementForm/projectManagementFormSlice";
import recipesManagerFormReducer from "../features/forms/recipesManagerForm/recipesManagerFormSlice";
import wzDocumentsFormReducer from "../features/forms/wzDocumentsForm/wzDocumentsFormSlice";
import coilLabelsFormReducer from "../features/forms/coilLabelsForm/coilLabelsFormSlice";
import stockModificationFormReducer from "../features/forms/stockModificationForm/stockModificationSlice";
import palletLabelsFormReducer from "../features/forms/palletLabelsForm/palletLabelsFormSlice";
import coilManagerFormReducer from "../features/forms/coilManagerForm/coilManagerFormSlice";
import outboundFormReducer from "../features/forms/outboundForm/outboundFormSlice";

export default configureStore({
  reducer: {
    outboundForm: outboundFormReducer,
    materials: materialsReducer,
    recipes: recipesReducer,
    contractors: contractorsReducer,
    projects: projectsReducer,
    plannedDeliveries: plannedDeliveriesReducer,
    coilManagerForm: coilManagerFormReducer,
    palletLabelsForm: palletLabelsFormReducer,
    coilLabelsForm: coilLabelsFormReducer,
    wzDocumentsForm: wzDocumentsFormReducer,
    recipesManagerForm: recipesManagerFormReducer,
    projectManagementForm: projectManagementFormReducer,
    materialManagementForm: materialManagementFormReducer,
    contractorManagementForm: contractorManagementFormReducer,
    userManagementForm: userManagementFormReducer,
    plannedDeliveryForm: plannedDeliveryFormReducer,
    createComponentsForm: createComponentsFormReducer,
    stockModificationForm: stockModificationFormReducer,
    logisticsStock: logisticsStockReducer,
    auth: authReducer,
  },
});
