import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  createBudget,
  loadBudgetTotalByUserCategory,
  updateBudget,
} from "../../actions/budgetActions";
import { useEffect } from "react";
import { useAuthStore } from "../../store/auth";
import { useBudgetStore } from "../../store/budget";
import { fetchTotalIncomes } from "../../api/income";
import { toast } from "react-toastify";

export const Presupuesto = ({ categoria, idCategoria }) => {

  const idUsuario = useAuthStore((state) => state.profile).id;
  const setPresupuesto = useBudgetStore((state) => state.setPresupuesto);
  const setIdPresupuesto = useBudgetStore((state) => state.setIdPresupuesto);
  const montoTotal = useBudgetStore((state) => state.presupuestoTotal);
  const idPresupuesto = useBudgetStore((state) => state.idPresupuesto);
  const [loading, setLoading] = useState(true);

  const [monto, setMonto] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadBudgets = async () => {
      const data = await loadBudgetTotalByUserCategory(idUsuario, idCategoria);

      if (data !== 0) {
        setPresupuesto(data.data.budgetamount);
        setIdPresupuesto(data.data.categoryDto.id);
      } else {
        setPresupuesto(data);
        setIdPresupuesto(null);
      }
      setLoading(false);
    };
    loadBudgets();
  }, [categoria]);

  const handleAddPresupuesto = async () => {
    setIsSubmitting(true);
    const montoNumber = parseFloat(monto);

    if (isNaN(montoNumber) || montoNumber <= 0) {
      toast.error("Ingrese un monto válido.");
      return;
    }
    const { data } = await fetchTotalIncomes(idUsuario);

    if (data > montoNumber) {
      const presupuesto = {
        budgetamount: montoNumber,
        idCategory: idCategoria,
        idUser: idUsuario,
      };

      if (!idPresupuesto) {
        const { data } = await createBudget(presupuesto);
        setIdPresupuesto(data.id);
        setPresupuesto(montoNumber);
        setMonto("");
      } else {
        const editPresupuesto = {
          idPresupuesto: idPresupuesto,
          budgetamount: montoNumber,
        };
        console.log(editPresupuesto);
        await updateBudget(editPresupuesto);
        setPresupuesto(montoNumber);
        setMonto("");
      }
    } else {
      toast.error("No tiene suficientes ingresos, total: " + data);
      setMonto("");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="pb-8">
      <div className="py-4">
        {loading ? (
          <p>Cargando presupuesto...</p>
        ) : (
          <p>
            Presupuesto <span className="capitalize">{categoria}</span>, total:{" "}
            {montoTotal}
          </p>
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

// Agregar validación de PropTypes
Presupuesto.propTypes = {
  categoria: PropTypes.string.isRequired,
  idCategoria: PropTypes.number.isRequired,
}