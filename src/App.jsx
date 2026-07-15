import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Login } from "./auth/Login";
import { AppLayout } from "./components/layout/AppLayout";
import { useAuth } from "./auth/AuthProvider";
import { TableContainer } from "./features/table/TableContainer";
import { useLogisticsStock } from "./features/tables/logisticsStock/useLogisticsStock";
import { useInitialWarehouseData } from "./hooks/useInitialTableData";
import { useLoadDictionaries } from "./hooks/useLoadDictionaries";
import { useProductionStock } from "./features/tables/productionStock/useProductionStock";
import { useServiceStock } from "./features/tables/serviceStock/useServiceStock";
import { useCoilStock } from "./features/tables/coilStock/useCoilStock";
import { useCkdStock } from "./features/tables/ckdStock/useCkdStock";
import { useProductionTransactions } from "./features/tables/productionTransactions/useProductionTransactions";
import { useLogisticsTransactions } from "./features/tables/logisticsTransactions/useLogisticsTransactions";
import { useCoilTransactions } from "./features/tables/coilTransactions/useCoilTransactions";

export const App = () => {
  const { accessToken } = useAuth();

  useInitialWarehouseData(accessToken);
  useLoadDictionaries(accessToken);

  const tabsAccess = useSelector((state) => state.auth.tabsAccess);
  const warehouseAccess = tabsAccess?.find((tab) => tab.code === "warehouse");
  const hasWarehouseAccess = warehouseAccess
    ? Object.values(warehouseAccess.subtabs).some(Boolean)
    : false;

  const productionStockProps = useProductionStock();
  const logisticsStockProps = useLogisticsStock();
  const serviceStockProps = useServiceStock();
  const coilStockProps = useCoilStock();
  const ckdStockProps = useCkdStock();
  const productionTransactionsProps = useProductionTransactions();
  const logisticsTransactionsProps = useLogisticsTransactions();
  const coilTransactionsProps = useCoilTransactions();

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
                to={hasWarehouseAccess ? "/productionStock" : "/settings"}
              />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/productionStock" />} />

          <Route
            path="/productionStock"
            element={<TableContainer {...productionStockProps} />}
          />

          <Route
            path="/logisticsStock"
            element={<TableContainer {...logisticsStockProps} />}
          />

          <Route
            path="/serviceStock"
            element={<TableContainer {...serviceStockProps} />}
          />

          <Route
            path="/coilStock"
            element={<TableContainer {...coilStockProps} />}
          />

          <Route
            path="/ckdStock"
            element={<TableContainer {...ckdStockProps} />}
          />

          <Route
            path="/productionTransactions"
            element={<TableContainer {...productionTransactionsProps} />}
          />

          <Route
            path="/logisticsTransactions"
            element={<TableContainer {...logisticsTransactionsProps} />}
          />

          <Route
            path="/transactions"
            element={<TableContainer {...coilTransactionsProps} />}
          />

        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
