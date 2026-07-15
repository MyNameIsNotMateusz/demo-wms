import { createSelector } from "@reduxjs/toolkit";

const productionStockLoading = (state) => state.productionStock.isLoading;
const logisticsStockLoading = (state) => state.logisticsStock.isLoading;
const serviceStockLoading = (state) => state.serviceStock.isLoading;
const coilStockLoading = (state) => state.coilStock.isLoading;
const ckdStockLoading = (state) => state.ckdStock.isLoading;
const productionTransactionsLoading = (state) =>
  state.productionTransactions.isLoading;
const logisticsTransactionsLoading = (state) =>
  state.logisticsTransactions.isLoading;
const coilTransactionsLoading = (state) => state.coilTransactions.isLoading;

export const selectIsWarehouseDataLoaded = createSelector(
  (state) => state.auth.tabsAccess,
  productionStockLoading,
  logisticsStockLoading,
  serviceStockLoading,
  coilStockLoading,
  ckdStockLoading,
  productionTransactionsLoading,
  logisticsTransactionsLoading,
  coilTransactionsLoading,
  (
    tabsAccess,
    productionStock,
    logisticsStock,
    serviceStock,
    coilStock,
    ckdStock,
    productionTransactions,
    logisticsTransactions,
    coilTransactions
  ) => {
    if (!tabsAccess) return false;

    const loadingMap = {
      sheet_production_stock: productionStock,
      sheet_logistic_stock: logisticsStock,
      sheet_service_stock: serviceStock,
      sheet_coil_stock: coilStock,
      sheet_ckd_stock: ckdStock,
      sheet_production_transaction: productionTransactions,
      sheet_logistics_transaction: logisticsTransactions,
      sheet_coil_transaction: coilTransactions
    };

    const warehouseTab = tabsAccess.find((tab) => tab.code === "warehouse");
    if (!warehouseTab?.subtabs) return true;

    const requiredSubtabs = Object.entries(warehouseTab.subtabs)
      .filter(([_, hasAccess]) => hasAccess)
      .map(([subtab]) => subtab);

    return requiredSubtabs.every((subtab) => {
      const loading = loadingMap[subtab];
      return loading === false || loading === undefined;
    });
  },
);
