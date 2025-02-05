import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAuthStore } from "../../store/auth";
import { useBudgetStore } from "../../store/budget";
import { addBudget } from "../../api/financialApi";

export const Presupuesto = ({ categoria, idCategoria }) => {

  const idUsuario = useAuthStore((state) => state.profile).id;
  const setPresupuesto = useBudgetStore((state) => state.setPresupuesto);
  const montoTotal = useBudgetStore((state) => state.presupuestoTotal);
  const [monto, setMonto] = useState("");

  const handleAddPresupuesto = async() => {
      
    if (!monto || isNaN(monto) || parseFloat(monto) <= 0){
      alert("Ingrese un monto valido");
      return;
      }

      try {
        const nuevoPresupuesto = await addBudget(idUsuario, idCategoria,monto);


        if (nuevoPresupuesto){
          alert("Presupuesto agregado exitosamente");
          setPresupuesto(nuevoPresupuesto);
          setMonto("");
        }else{
          alert("Hubo un error al agregar el presupuesto");
        }
      } catch (error){
        console.error("Error al agregar presupuesto:", error);
      }
  };
  

  return (
    <div className="pb-8">
      <div className="py-6">
        Presupuesto <span className="capitalize">{categoria}</span> , total: {montoTotal};
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
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Agregar Presupuesto
      </button>
    </div>
  );
};

// Agregar validación de PropTypes
Presupuesto.propTypes = {
  categoria: PropTypes.string.isRequired,
  idCategoria: PropTypes.number.isRequired,
}