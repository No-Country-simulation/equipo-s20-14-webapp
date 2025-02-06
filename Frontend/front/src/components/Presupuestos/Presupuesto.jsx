import PropTypes from "prop-types";
import React from "react";
import useBudget from "../../hooks/useBudget";

export const Presupuesto = ({ categoria, idCategoria }) => {
  const {
    monto,
    setMonto,
    loading,
    isSubmitting,
    montoTotal,
    handleAddPresupuesto,
  } = useBudget(idCategoria);

  return (
    <div className="pb-8">
      <div className="py-4">
        {loading ? (
          <p>Cargando presupuesto...</p>
        ) : montoTotal && montoTotal > 0 ? (
          <p>Presupuesto Inicial: ${montoTotal}</p>
        ) : (
          <span className="text-gray-500">Aún no definiste presupuesto</span>
        )}
      </div>
      <input
        type="number"
        placeholder="Monto"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        className="px-4 py-2 border rounded-md"
      />
      <button
        onClick={handleAddPresupuesto}
        disabled={isSubmitting}
        className={`ml-2 px-4 py-2 rounded-md ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
      >
        {isSubmitting
          ? "Cargando..."
          : montoTotal === 0
          ? "Agregar Presupuesto"
          : "Editar Presupuesto"}
      </button>
    </div>
  );
};

Presupuesto.propTypes = {
  categoria: PropTypes.string.isRequired,
  idCategoria: PropTypes.number.isRequired,
};
