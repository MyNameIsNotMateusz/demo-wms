import { useSelector, useDispatch } from "react-redux";
import { setSortConfig, setFilters } from "./coilTransactionsSlice";
import { selectCoilTransactions } from "./coilTransactionsSelector";
import { coilTransactionsColumns } from "./coilTransactionsColumns";

export const useCoilTransactions = () => {
  const dispatch = useDispatch();
  const { filters, sortConfig } = useSelector(
    (state) => state.coilTransactions,
  );
  const data = useSelector(selectCoilTransactions);

  return {
    tableOrigin: "coilTransactions",
    columns: coilTransactionsColumns,
    data,
    sortConfig,
    filters,
    setSortConfig: (payload) => dispatch(setSortConfig(payload)),
    setFilters: (payload) => dispatch(setFilters(payload)),
  };
};
