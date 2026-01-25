import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Login } from "./auth/Login";
import { AppLayout } from "./components/layout/AppLayout";
import { useAuth } from "./auth/AuthProvider";

export const App = () => {
  const { accessToken } = useAuth();

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
          element={accessToken ? <Navigate to="/logisticsStock" /> : <Login />}
        />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/logisticsStock" />} />

          <Route
            path="/logisticsStock"
            element={<h1>hej tutaj logistics stock</h1>}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
