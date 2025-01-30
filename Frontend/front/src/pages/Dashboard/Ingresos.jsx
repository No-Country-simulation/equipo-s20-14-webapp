import React from "react";
import { useParams } from "react-router-dom";
import IngresoItem from "../../components/Dashboard/IngresoItem";
import IncomeList from "../../components/Dashboard/IncomeList";

export const Ingresos = () => {
  const { tipo } = useParams();

  return (
    <div className="ml-10 mt-4">
      <h1 className="pb-2">
        Ingresos - <span className="capitalize">{tipo}</span>
      </h1>
      <IngresoItem tipo={tipo} />
      <IncomeList />
    </div>
  );
};
