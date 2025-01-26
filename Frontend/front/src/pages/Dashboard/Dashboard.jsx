import React from "react";
import Header from "../../components/Header";
import { SidebarMenu } from "../../components/Dashboard/SidebarMenu";
import { Outlet } from "react-router-dom";

const sections = [
  {
    title: "Ingresos",
    subItems: [
      { label: "Mensual", path: "/dashboard/ingresos/mensual" },
      { label: "Quincenal", path: "/dashboard/ingresos/quincenal" },
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
