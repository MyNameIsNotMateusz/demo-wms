import { useSelector, useDispatch } from "react-redux";
import { setSortConfig, setFilters } from "./logisticsStockSlice";
import { selectLogisticsStock } from "./logisticsStockSelector";

export const useLogisticsStock = () => {
  const dispatch = useDispatch();
  const { columns, filters, sortConfig } = useSelector(
    (state) => state.logisticsStock,
  );
  const data = useSelector(selectLogisticsStock);

  return {
    tableOrigin: "logisticsStock",
    columns,
    data,
    sortConfig,
    filters,
    setSortConfig: (payload) => dispatch(setSortConfig(payload)),
    setFilters: (payload) => dispatch(setFilters(payload)),
  };
};
