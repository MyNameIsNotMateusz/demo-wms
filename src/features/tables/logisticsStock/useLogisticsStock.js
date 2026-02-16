import { useSelector, useDispatch } from "react-redux";
import { setSortConfig, setFilters } from "./logisticsStockSlice";
import { selectLogisticsStock } from "./logisticsStockSelector";
import { logisticsStockColumns } from "./logisticsStockColumns";

export const useLogisticsStock = () => {
  const dispatch = useDispatch();
  const { filters, sortConfig } = useSelector(
    (state) => state.logisticsStock,
  );
  const data = useSelector(selectLogisticsStock);

  return {
    tableOrigin: "logisticsStock",
    columns: logisticsStockColumns,
    data,
    sortConfig,
    filters,
    setSortConfig: (payload) => dispatch(setSortConfig(payload)),
    setFilters: (payload) => dispatch(setFilters(payload)),
  };
};
