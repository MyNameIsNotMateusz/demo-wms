import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Login } from "./auth/Login";
import { AppLayout } from "./components/layout/AppLayout";

export const App = () => {
  const tabsAccess = useSelector((state) => state.auth.tabsAccess);
  const warehouseAccess = tabsAccess?.find((tab) => tab.code === "warehouse");

  const hasWarehouseAccess = warehouseAccess
    ? Object.values(warehouseAccess.subtabs).some(Boolean)
    : false;

  const token = useSelector((state) => state.auth.token);

  if (!token) {
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
            token ? (
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
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
