import { useSelector, useDispatch } from "react-redux";
import { setSortConfig, setFilters } from "./serviceStockSlice";
import { selectServiceStock } from "./serviceStockSelector";
import { serviceStockColumns } from "./serviceStockColumns";

export const useServiceStock = () => {
  const dispatch = useDispatch();
  const { filters, sortConfig } = useSelector(
    (state) => state.serviceStock,
  );
  const data = useSelector(selectServiceStock);

  return {
    tableOrigin: "serviceStock",
    columns: serviceStockColumns,
    data,
    sortConfig,
    filters,
    setSortConfig: (payload) => dispatch(setSortConfig(payload)),
    setFilters: (payload) => dispatch(setFilters(payload)),
  };
};
