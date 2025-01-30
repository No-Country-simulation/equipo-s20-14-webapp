import React, { useEffect, useState } from "react";
import { getIncomes } from "../../actions/incomeActions";
import { useAuthStore } from "../../store/auth";

const IncomeList = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const usuarioId = useAuthStore((state) => state.profile.id);

  useEffect(() => {
    const loadIncomes = async () => {
      const data = await getIncomes(usuarioId);

      if (data) setIncomes(data);
      setLoading(false);
    };
    loadIncomes();
  }, []);

  if (loading) return <p>Cargando ingresos...</p>;

  if (incomes.length === 0) return <p>No hay ingresos registrados.</p>;

  return (
    <div>
      <h2>Lista de Ingresos</h2>
      <ul>
        {incomes.map((income) => (
          <li key={income.id}>
            {income.descripcion} - ${income.monto}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeList;
