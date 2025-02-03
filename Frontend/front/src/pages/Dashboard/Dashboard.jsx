import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { SidebarMenu } from "../../components/Dashboard/SidebarMenu";
import Header from "../../components/Header";

import { loadCategories } from "../../actions/categories";
import { useCategoryStore } from "../../store/category";
import { useAuthStore } from "../../store/auth";

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
  const idUsuario = useAuthStore.getState().profile.id;
  const setCategorias = useCategoryStore((state) => state.setCategorias);
  const categorias = useCategoryStore.getState().categorias;
  console.log(sections);
  

  useEffect(() => {
    const getCategorias = async () => {
      const data = await loadCategories(idUsuario);
      if (data) setCategorias(data);
      
    };
    getCategorias();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex ">
        <SidebarMenu sections={sections} categorias={categorias} />
        <Outlet />
      </div>
    </div>
    
    
  );
};
