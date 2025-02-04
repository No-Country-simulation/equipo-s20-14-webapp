import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getIncomes } from "../../actions/incomeActions";
import { useAuthStore } from "../../store/auth";

const IncomeList = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const usuarioId = useAuthStore((state) => state.profile.id);
  const location = useLocation();
  const isExtraIncome = location.pathname.includes("extra");

  useEffect(() => {
    const loadIncomes = async () => {
      const data = await getIncomes(usuarioId);
      if (data) setIncomes(data);
      setLoading(false);
    };
    loadIncomes();
  }, [usuarioId]);

  if (loading) return <p>Cargando ingresos...</p>;
  if (incomes.length === 0) return <p>No hay ingresos registrados.</p>;

  const filteredIncomes = incomes.filter(
    (income) => income.esFijo !== isExtraIncome
  );
  const totalAmount = filteredIncomes.reduce(
    (acc, curr) => acc + curr.monto,
    0
  );

  return (
    <div>
      <h2>
        {isExtraIncome
          ? "Lista de Ingresos Extras"
          : "Lista de Ingresos Mensuales"}
      </h2>

      <div>
        <p>
          <strong>
            Total {isExtraIncome ? "Ingresos Extras" : "Ingresos Mensuales"}:
          </strong>{" "}
          ${totalAmount}
        </p>
      </div>
      {/* 
      <ul>
        {filteredIncomes.map((income) => (
          <li key={income.operacionId}>
            {income.descripcion} - ${income.monto}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default IncomeList;
