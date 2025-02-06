import React from "react";
import useIngresoItem from "../../hooks/useIngresoItem";
import TotalIncome from "./TotalIncome";
import IncomeList from "./ListIncome";

const IngresoItem = () => {
  const {
    monto,
    setMonto,
    descripcion,
    setDescripcion,
    cicloDias,
    setCicloDias,
    incomes,
    loading,
    isSubmitting,
    isExtraIncome,
    handleAddIngreso,
  } = useIngresoItem();

  return (
    <div className="w-full h-screen">
      <TotalIncome />
      <div className="pt-4 flex gap-6">
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />

        {!isExtraIncome && (
          <input
            type="number"
            placeholder="Ciclo de días"
            value={cicloDias}
            onChange={(e) => setCicloDias(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
        )}

        <button
          onClick={handleAddIngreso}
          disabled={isSubmitting}
          className={`ml-2 px-4 py-2 rounded-md ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          {isSubmitting ? "Cargando..." : "Agregar Ingreso"}
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-4">Cargando ingresos...</p>
      ) : incomes.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          No hay ingresos registrados.
        </p>
      ) : (
        <IncomeList incomes={incomes} isExtraIncome={isExtraIncome} />
      )}
    </div>
  );
};

export default IngresoItem;
