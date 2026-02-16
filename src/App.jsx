import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Login } from "./auth/Login";
import { AppLayout } from "./components/layout/AppLayout";
import { useAuth } from "./auth/AuthProvider";
import { TableContainer } from "./features/table/TableContainer";
import { useLogisticsStock } from "./features/tables/logisticsStock/useLogisticsStock";
import { useInitialWarehouseData } from "./hooks/useInitialTableData";
import { useLoadDictionaries } from "./hooks/useLoadDictionaries";

export const App = () => {
  const { accessToken } = useAuth();

  useInitialWarehouseData(accessToken);
  useLoadDictionaries(accessToken);

  const tabsAccess = useSelector((state) => state.auth.tabsAccess);
  const warehouseAccess = tabsAccess?.find((tab) => tab.code === "warehouse");
  const hasWarehouseAccess = warehouseAccess
    ? Object.values(warehouseAccess.subtabs).some(Boolean)
    : false;

  const logisticsStockProps = useLogisticsStock();

  if (!accessToken) {
    return (
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </HashRouter>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/login"
          element={
            accessToken ? (
              <Navigate
                to={hasWarehouseAccess ? "/logisticsStock" : "/settings"}
              />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/logisticsStock" />} />

          <Route
            path="/logisticsStock"
            element={<TableContainer {...logisticsStockProps} />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
