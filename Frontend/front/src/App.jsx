import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FinanzasApp } from "./pages/FinanzasApp";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Ingresos } from "./pages/Dashboard/Ingresos";
import { ToastContainer } from "react-toastify";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/Register";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login/*" element={<LoginPage />} />
        <Route path="/register/*" element={<RegisterPage />} />
        <Route path="/" element={<FinanzasApp />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="ingresos/:tipo" element={<Ingresos />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Router>
  );
}
