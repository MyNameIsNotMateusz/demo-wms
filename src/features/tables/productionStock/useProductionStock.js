import { useSelector, useDispatch } from "react-redux";
import { setSortConfig, setFilters } from "./productionStockSlice";
import { selectProductionStock } from "./productionStockSelector";
import { productionStockColumns } from "./productionStockColumns";

export const useProductionStock = () => {
  const dispatch = useDispatch();
  const { filters, sortConfig } = useSelector((state) => state.productionStock);
  const data = useSelector(selectProductionStock);

  return {
    tableOrigin: "productionStock",
    columns: productionStockColumns,
    data,
    sortConfig,
    filters,
    setSortConfig: (payload) => dispatch(setSortConfig(payload)),
    setFilters: (payload) => dispatch(setFilters(payload)),
  };
};
