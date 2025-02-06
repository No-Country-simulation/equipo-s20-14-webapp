import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createBudget,
  loadBudgetTotalByUserCategory,
  updateBudget,
} from "../actions/budgetActions";
import { fetchTotalIncomes } from "../api/income";
import { useAuthStore } from "../store/auth";
import { useBudgetStore } from "../store/budget";

const useBudget = (idCategoria) => {
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
        setIdPresupuesto(data.data.id);
        setPresupuesto(data.data.budgetamount);
      } else {
        setPresupuesto(0);
        setIdPresupuesto(null);
      }
      setLoading(false);
    };
    loadBudgets();
  }, [idCategoria]);

  const handleAddPresupuesto = async () => {
    setIsSubmitting(true);
    const montoNumber = parseFloat(monto);

    if (isNaN(montoNumber) || montoNumber <= 0) {
      toast.error("Ingrese un monto válido.");
      setIsSubmitting(false);
      return;
    }

    const { data } = await fetchTotalIncomes(idUsuario);
    if (data < montoNumber) {
      toast.error(`No tiene suficientes ingresos, total: ${data}`);
      setMonto("");
      setIsSubmitting(false);
      return;
    }

    const presupuesto = {
      budgetamount: montoNumber,
      idCategory: idCategoria,
      idUser: idUsuario,
    };

    if (!idPresupuesto) {
      const { data } = await createBudget(presupuesto);
      setIdPresupuesto(data.id);
    } else {
      const editPresupuesto = {
        idPresupuesto: idPresupuesto,
        budgetamount: montoNumber,
      };
      await updateBudget(editPresupuesto);
    }

    setPresupuesto(montoNumber);
    setMonto("");
    setIsSubmitting(false);
  };

  return {
    monto,
    setMonto,
    loading,
    isSubmitting,
    montoTotal,
    handleAddPresupuesto,
  };
};

export default useBudget;
