import React from "react";
import { useLocation } from "react-router-dom";

export const SidebarGastos = ({ categorias }) => {
  
  const location = useLocation();  

  const isSectionActive = (path) => {
    return location.pathname.startsWith(path)
      ? "text-green-600"
      : "text-gray-700";
  };

  return (<ul className="space-y-2 mb-2">
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            <h3
              className={`block font-semibold px-3 py-2 rounded-md hover:bg-gray-200 ${isSectionActive(
                categoria.path
              )}`}
            >
              {categoria.nombre}
            </h3>
          </li>
        ))}
      </ul>
  );
};
