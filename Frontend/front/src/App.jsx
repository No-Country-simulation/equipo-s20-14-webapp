import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FinanzasApp } from "./pages/FinanzasApp";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Ingresos } from "./pages/Dashboard/Ingresos";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FinanzasApp />} />

        {/* Ruta para el Dashboard y sus rutas hijas */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Ruta dinámica para ingresos */}
          <Route path="ingresos/:tipo" element={<Ingresos />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Router>
  );
}
