import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarMenu } from "../../components/Dashboard/SidebarMenu";
import Header from "../../components/Header";
import { useCategoryStore } from "../../store/category";

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
    subItems: [],
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
  const pathCategorias = useCategoryStore((state) => state.pathCategorias);

  return (
    <div>
      <Header />
      <div className="flex ">
        <SidebarMenu sections={sections} categorias={pathCategorias} />

        <Outlet />
      </div>
    </div>
  );
};
