import useTotalIncome from "../../hooks/useTotalIncome";

const TotalIncome = () => {
  const { totalAmount, loading, isExtraIncome } = useTotalIncome();

  if (loading) return <p>Cargando ingresos...</p>;
  if (totalAmount === 0) return <p>No hay ingresos registrados.</p>;

  return (
    <div>
      <p>
        <strong>
          Total {isExtraIncome ? "Ingresos Extras" : "Ingresos Mensuales"}:
        </strong>{" "}
        ${totalAmount}
      </p>
    </div>
  );
};

export default TotalIncome;
