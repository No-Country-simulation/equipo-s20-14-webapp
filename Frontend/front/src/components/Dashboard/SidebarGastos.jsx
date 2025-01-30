import React from "react";
import { useLocation } from "react-router-dom";

export const SidebarGastos = ({ sections }) => {
  const location = useLocation();

  const isSectionActive = (path) => {
    return location.pathname.startsWith(path)
      ? "text-green-600"
      : "text-gray-700";
  };

  return (
    <div className="w-64 h-screen bg-gray-100 border-r border-gray-300 p-4">
      <ul className="space-y-4">
        {sections.map((nombre, index) => (
          <li key={index}>
            <h3
              className={`font-bold text-lg ${isSectionActive(
                `/dashboard/${nombre.toLowerCase()}`
              )}`}
            >
              {nombre}
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
};
