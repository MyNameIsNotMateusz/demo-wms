import { selectProductionStock } from "../../features/tables/productionStock/productionStockSelector";
import { selectLogisticsStock } from "../../features/tables/logisticsStock/logisticsStockSelector";
import { selectServiceStock } from "../../features/tables/serviceStock/serviceStockSelector";
import { selectCoilStock } from "../../features/tables/coilStock/coilStockSelector";
import { selectCkdStock } from "../../features/tables/ckdStock/ckdStockSelector";
import { selectProductionTransactions } from "../../features/tables/productionTransactions/productionTransactionsSelector";
import { selectLogisticsTransactions } from "../../features/tables/logisticsTransactions/logisticsTransactionsSelector";
import { selectCoilTransactions } from "../../features/tables/coilTransactions/coilTransactionsSelector";

export const selectors = {
  selectProductionStock,
  selectLogisticsStock,
  selectServiceStock,
  selectCoilStock,
  selectCkdStock,
  selectProductionTransactions,
  selectLogisticsTransactions,
  selectCoilTransactions,
};
