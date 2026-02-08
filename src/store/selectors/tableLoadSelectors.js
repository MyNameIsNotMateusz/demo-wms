import { createSelector } from "@reduxjs/toolkit";

const logisticsStockLoading = (state) => state.logisticsStock.isLoading;

export const selectIsWarehouseDataLoaded = createSelector(
  (state) => state.auth.tabsAccess,
  logisticsStockLoading,
  (tabsAccess, logisticsStock) => {
    if (!tabsAccess) return false;

    const loadingMap = {
      sheet_logistic_stock: logisticsStock,
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
