import React from "react";

const IncomeList = ({ incomes, isExtraIncome }) => {
  const filteredIncomes = incomes.filter(
    (income) => income.esFijo !== isExtraIncome
  );

  return (
    <div className="w-full">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pr-10 pt-4">
        {filteredIncomes.map((income) => (
          <li
            key={income.operacionId}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all"
          >
            <div className="text-lg font-semibold text-gray-800">
              <h4>
                Descripción: <span>{income.descripcion}</span>
              </h4>
            </div>
            <div className="text-sm text-gray-600">
              <p>Monto: ${income.monto}</p>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                Fecha de carga:{" "}
                {income.esFijo
                  ? income.fechaProgramada
                    ? income.fechaProgramada
                    : "Pendiente"
                  : income.fechaEfectuada
                  ? income.fechaEfectuada
                  : "Pendiente"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeList;
