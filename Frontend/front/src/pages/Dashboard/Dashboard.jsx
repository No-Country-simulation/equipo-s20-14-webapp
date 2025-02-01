
import { Outlet } from "react-router-dom";

import { SidebarMenu } from "../../components/Dashboard/SidebarMenu";
import Header from "../../components/Header";




const sections = [
  {
    title: "Ingresos",
    subItems: [
      { label: "Mensual", path: "/dashboard/ingresos/mensual" },
      { label: "Extra", path: "/dashboard/ingresos/extra" },
    ],
  },
  {
    title: "Gastos",
    subItems: [
      { label: "Fijos", path: "/egresos/fijos" },
      { label: "Variables", path: "/egresos/variables" },
    ],
  },
  {
    title: "Reporte",
    subItems: [
      { label: "Reporte General", path: "/dashboard/reporte-general" },
      { label: "Reporte Ingresos", path: "/dashboard/reporte-ingresos" },
      { label: "Reporte Gastos", path: "/dashboard/reporte-gastos" },
    ],
  },
];

export const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className="flex ">
        <SidebarMenu sections={sections} />
        <Outlet />
      </div>
    </div>
    
    
  );
};
