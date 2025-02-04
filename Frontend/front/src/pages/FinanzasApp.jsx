import Header from "../components/Header";
import Footer from "../components/Footer";


import CarouselPage from "../components/Inicio/CarouselPage";

import { Dashboard } from "@mui/icons-material";

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