import { useSelector, useDispatch } from "react-redux";
import { setSortConfig, setFilters } from "./ckdStockSlice";
import { selectCkdStock } from "./ckdStockSelector";
import { ckdStockColumns } from "./ckdStockColumns";

export const useCkdStock = () => {
  const dispatch = useDispatch();
  const { filters, sortConfig } = useSelector(
    (state) => state.ckdStock,
  );
  const data = useSelector(selectCkdStock);

  return {
    tableOrigin: "ckdStock",
    columns: ckdStockColumns,
    data,
    sortConfig,
    filters,
    setSortConfig: (payload) => dispatch(setSortConfig(payload)),
    setFilters: (payload) => dispatch(setFilters(payload)),
  };
};
