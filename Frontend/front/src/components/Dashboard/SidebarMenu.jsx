import React from "react";
import { Link } from "react-router-dom";

export const SidebarMenu = ({ sections }) => {
  return (
    <div className="w-64 h-screen bg-gray-100 border-r border-gray-300 p-4">
      {sections.map((section, index) => (
        <div key={index} className="mb-6">
          {/* Título principal */}
          <h2 className="text-xl font-bold mb-2">{section.title}</h2>
          {/* Subtítulos */}
          <ul className="space-y-1">
            {section.subItems.map((item, subIndex) => (
              <li key={subIndex}>
                <Link
                  to={item.path}
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
