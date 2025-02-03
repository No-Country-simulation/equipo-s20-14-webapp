import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FinanzasApp } from "./pages/FinanzasApp";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Ingresos } from "./pages/Dashboard/Ingresos";
import { ToastContainer } from "react-toastify";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/Register";
import ReporteGeneral from "./pages/Dashboard/Reporte/ReporteGeneral";
import ReporteIngresos from "./pages/Dashboard/Reporte/ReporteIngresos";
import ReporteGastos from "./pages/Dashboard/Reporte/ReporteGastos";
import { useAuthStore } from "./store/auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import VistaServicios from "./components/Vistas/VistaServicios";
import VistaTransporte from './components/Vistas/VistaTransporte';

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
            <Route path="reporte-general" element={<ReporteGeneral />} />
            <Route path="reporte-ingresos" element={<ReporteIngresos />} />
            <Route path="reporte-gastos" element={<ReporteGastos />} />
            <Route path="vista-servicios" element={<VistaServicios />}/>
            <Route path="vista-transporte" element={<VistaTransporte />}/>
          </Route>
        </Route>
        
      </Routes>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Router>
  );
}
