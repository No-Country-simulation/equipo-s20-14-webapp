import React from "react";
import Header from "../../components/Header";
import { SidebarMenu } from "../../components/Dashboard/SidebarMenu";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../../store/auth";

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

  const idUsuario = useAuthStore.getState().profile.id;
  const token = useAuthStore.getState().token

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await fetch(`https://equipo-s20-14-webapp.onrender.com/categorias/lista/${idUsuario}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        mode: "cors"
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    }
    fetchCategorias();
  }, [])
  
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
