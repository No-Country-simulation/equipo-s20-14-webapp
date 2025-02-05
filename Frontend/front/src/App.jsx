import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import VistaGastos from "./components/Vistas/VistaGastos";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/Register";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Gastos } from "./pages/Dashboard/Gastos";
import { Ingresos } from "./pages/Dashboard/Ingresos";
import ReporteGastos from "./pages/Dashboard/Reporte/ReporteGastos";
import ReporteGeneral from "./pages/Dashboard/Reporte/ReporteGeneral";
import ReporteIngresos from "./pages/Dashboard/Reporte/ReporteIngresos";
import { FinanzasApp } from "./pages/FinanzasApp";
import { useAuthStore } from "./store/auth";

export default function App() {
  const isAuth = useAuthStore((state) => state.isAuth);
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute isAllowed={isAuth} />}>
          <Route path="/login/*" element={<LoginPage />} />
          <Route path="/register/*" element={<RegisterPage />} />
          <Route path="/" element={<FinanzasApp />} />
        </Route>

        <Route element={<ProtectedRoute isAllowed={isAuth} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="ingresos/:tipo" element={<Ingresos />} />
            <Route path="gastos/:categoria/:id" element={<Gastos />} />
            <Route path="gastos" element={<VistaGastos />} />
            <Route path="reporte-general" element={<ReporteGeneral />} />
            <Route path="reporte-ingresos" element={<ReporteIngresos />} />
            <Route path="reporte-gastos" element={<ReporteGastos />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Router>
  );
}
