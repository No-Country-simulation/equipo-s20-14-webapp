import Header from "../components/Header";
import Footer from "../components/Footer";


import CarouselPage from "../components/Inicio/CarouselPage";

import Dashboard from "../pages/Dashboard/Reporte/ReporteGeneral";

export const FinanzasApp = () => {
  return (
    <div>
      <Header />
      <CarouselPage />
      <Dashboard />
      
      <Footer />
    </div>
  );
};