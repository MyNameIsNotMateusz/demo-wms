import { useSelector, useDispatch } from "react-redux";
import { setSortConfig, setFilters } from "./productionTransactionsSlice";
import { selectProductionTransactions } from "./productionTransactionsSelector";
import { productionTransactionsColumns } from "./productionTransactionsColumns";

export const useProductionTransactions = () => {
  const dispatch = useDispatch();
  const { filters, sortConfig } = useSelector(
    (state) => state.productionTransactions,
  );
  const data = useSelector(selectProductionTransactions);

  return {
    tableOrigin: "productionTransactions",
    columns: productionTransactionsColumns,
    data,
    sortConfig,
    filters,
    setSortConfig: (payload) => dispatch(setSortConfig(payload)),
    setFilters: (payload) => dispatch(setFilters(payload)),
  };
};
