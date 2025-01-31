import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarGastos } from "./SidebarGastos";

export const SidebarMenu = ({ sections, categorias }) => {
  const location = useLocation();

  const isSectionActive = (path) => {
    return location.pathname.startsWith(path)
      ? "text-green-600"
      : "text-gray-700";
  };

  return (
    <div className="w-64 h-screen bg-gray-100 border-r border-gray-300 p-4">
    <SidebarGastos categorias={categorias} />
      <ul className="space-y-4">
        {sections.map((section, index) => (
          <li key={index}>
            <h3
              className={`font-bold text-lg ${isSectionActive(
                `/dashboard/${section.title.toLowerCase()}`
              )}`}
            >
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.subItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`block  font-semibold px-3 py-2 rounded-md hover:bg-gray-200 ${isSectionActive(
                      item.path
                    )}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
