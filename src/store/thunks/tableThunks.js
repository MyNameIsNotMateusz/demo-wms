import { fetchProductionStock } from "../../features/tables/productionStock/productionStockSlice";
import { fetchLogisticsStock } from "../../features/tables/logisticsStock/logisticsStockSlice";
import { fetchServiceStock } from "../../features/tables/serviceStock/serviceStockSlice";
import { fetchCoilStock } from "../../features/tables/coilStock/coilStockSlice";
import { fetchCkdStock } from "../../features/tables/ckdStock/ckdStockSlice";
import { fetchProductionTransactions } from "../../features/tables/productionTransactions/productionTransactionsSlice";
import { fetchLogisticsTransactions } from "../../features/tables/logisticsTransactions/logisticsTransactionsSlice";
import { fetchCoilTransactions } from "../../features/tables/coilTransactions/coilTransactionsSlice";

export const tableThunks = {
  fetchProductionStock,
  fetchLogisticsStock,
  fetchServiceStock,
  fetchCoilStock,
  fetchCkdStock,
  fetchProductionTransactions,
  fetchLogisticsTransactions,
  fetchCoilTransactions,
};
