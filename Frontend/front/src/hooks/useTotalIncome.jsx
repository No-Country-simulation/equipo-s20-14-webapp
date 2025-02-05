import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getIncomes } from "../actions/incomeActions";
import { useAuthStore } from "../store/auth";

const useTotalIncome = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);

  const usuarioId = useAuthStore((state) => state.profile.id);
  const location = useLocation();
  const isExtraIncome = location.pathname.includes("extra");

  useEffect(() => {
    const loadIncomes = async () => {
      if (!usuarioId) return;
      setLoading(true);
      const data = await getIncomes(usuarioId);
      if (data) setIncomes(data);
      setLoading(false);
    };
    loadIncomes();
  }, [usuarioId]);

  // Filtra los ingresos según el tipo (extra o mensual)
  const filteredIncomes = incomes.filter(
    (income) => income.esFijo !== isExtraIncome
  );

  // Calcula el total de ingresos
  const totalAmount = filteredIncomes.reduce(
    (acc, curr) => acc + curr.monto,
    0
  );

  return { totalAmount, loading, isExtraIncome };
};

export default useTotalIncome;
