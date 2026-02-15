import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tableThunks } from "../store/thunks/tableThunks";

const { fetchLogisticsStock } = tableThunks;

export const useInitialWarehouseData = (accessToken) => {
  const dispatch = useDispatch();
  const tabsAccess = useSelector((state) => state.auth.tabsAccess);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!accessToken || !tabsAccess || hasFetched.current) return;

    const warehouseAccess = tabsAccess.find((tab) => tab.code === "warehouse");

    if (!warehouseAccess?.subtabs) return;

    if (warehouseAccess.subtabs.sheet_logistic_stock) {
      dispatch(fetchLogisticsStock(accessToken));
    }

    hasFetched.current = true;
  }, [dispatch, accessToken, tabsAccess]);
};
