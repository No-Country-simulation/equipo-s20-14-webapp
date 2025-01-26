import Header from "../components/Header";
import Footer from "../components/Footer"
import CarouselPage from '../components/Inicio/CarouselPage';
import ReporteIngresos from "../components/Reporte/ReporteIngresos";



export const FinanzasApp = () => {
  return (
    <div>
      <Header />
      <CarouselPage />
      <ReporteIngresos />
      <Footer />

    </div>
  );
};
