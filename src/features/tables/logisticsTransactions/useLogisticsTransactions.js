import { useSelector, useDispatch } from "react-redux";
import { setSortConfig, setFilters } from "./logisticsTransactionsSlice";
import { selectLogisticsTransactions } from "./logisticsTransactionsSelector";
import { logisticsTransactionsColumns } from "./logisticsTransactionsColumns";

export const useLogisticsTransactions = () => {
  const dispatch = useDispatch();
  const { filters, sortConfig } = useSelector(
    (state) => state.logisticsTransactions,
  );
  const data = useSelector(selectLogisticsTransactions);

  return {
    tableOrigin: "logisticsTransactions",
    columns: logisticsTransactionsColumns,
    data,
    sortConfig,
    filters,
    setSortConfig: (payload) => dispatch(setSortConfig(payload)),
    setFilters: (payload) => dispatch(setFilters(payload)),
  };
};
