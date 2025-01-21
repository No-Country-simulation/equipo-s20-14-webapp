import React from "react";
import { useParams } from "react-router-dom";

export const Ingresos = () => {
  const { tipo } = useParams();

  console.log(tipo);

  const renderContent = () => {
    switch (tipo) {
      case "mensual":
        return <p>Contenido para Ingresos Mensual</p>;
      case "quincenal":
        return <p>Contenido para Ingresos Quincenal</p>;
      case "extra":
        return <p>Contenido para Ingresos Extra</p>;
      default:
        return <p>Sección no encontrada</p>;
    }
  };

  return (
    <div>
      <h1>Ingresos - {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h1>
      {renderContent()}
    </div>
  );
};
