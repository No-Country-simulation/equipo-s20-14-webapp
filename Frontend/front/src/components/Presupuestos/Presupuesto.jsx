import React from "react";
import { loadBudgetTotalByUserCategory } from "../../actions/budgetActions";
import { useEffect } from "react";
import { useAuthStore } from "../../store/auth";
import { useBudgetStore } from "../../store/budget";

export const Presupuesto = ({ categoria, idCategoria }) => {
  const idUsuario = useAuthStore((state) => state.profile).id;
  const setPresupuesto = useBudgetStore((state) => state.setPresupuesto);
  const montoTotal = useBudgetStore((state) => state.presupuestoTotal);

  useEffect(() => {
    console.log("presupuesto");
    
    const loadBudgets = async () => {
      const data = await loadBudgetTotalByUserCategory(idUsuario, idCategoria);
      console.log(data);
      setPresupuesto(data);
    };
    loadBudgets();
  }, []);

  return (
    <div className="pb-8">
      <div className="py-6">
        Presupuesto <span className="capitalize">{categoria}</span>, total: {montoTotal}
      </div>
      <input
        type="number"
        placeholder="Monto"
        // value={monto}
        onChange={(e) => setMonto(e.target.value)}
        className="px-4 py-2 border rounded-md"
      />
      <button
        // onClick={handleAddIngreso}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Agregar Presupuesto
      </button>
    </div>
  );
};
