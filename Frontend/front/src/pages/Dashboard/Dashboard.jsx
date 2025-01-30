import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { SidebarMenu } from "../../components/Dashboard/SidebarMenu";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { categoryRequest } from "../../api/category";

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
  const userId = useAuthStore((state) => state.profile.id);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!userId) return;
        const response = await categoryRequest(userId);
        setCategories(response.data);
      } catch (error) {
        console.error("Error obteniendo categorías:", error);
      }
    };

    fetchCategories();
  }, [userId]);

  return (
    <div>
      <Header />
      <div className="flex ">
        <SidebarMenu sections={sections} />

        {/* Contenedor de categorías */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Categorías</h2>
          <ul className="list-disc list-inside">
            {categories.length > 0 ? (
              categories.map((category) => (
                <li key={category.id} className="text-gray-700">
                  {category.nombre}
                </li>
              ))
            ) : (
              <p className="text-gray-500">Cargando categorías...</p>
            )}
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
