import { useSelector, useDispatch } from "react-redux";
import { setSortConfig, setFilters } from "./coilStockSlice";
import { selectCoilStock } from "./coilStockSelector";
import { coilStockColumns } from "./coilStockColumns";

export const useCoilStock = () => {
  const dispatch = useDispatch();
  const { filters, sortConfig } = useSelector(
    (state) => state.coilStock,
  );
  const data = useSelector(selectCoilStock);

  return {
    tableOrigin: "coilStock",
    columns: coilStockColumns,
    data,
    sortConfig,
    filters,
    setSortConfig: (payload) => dispatch(setSortConfig(payload)),
    setFilters: (payload) => dispatch(setFilters(payload)),
  };
};
