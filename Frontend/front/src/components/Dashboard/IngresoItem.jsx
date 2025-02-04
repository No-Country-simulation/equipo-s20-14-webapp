import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addIncome,
  addIncomeExtra,
  getIncomes,
} from "../../actions/incomeActions";
import { useAuthStore } from "../../store/auth";
import TotalIncome from "./TotalIncome";
import IncomeList from "./ListIncome";

const IngresoItem = ({ tipo }) => {
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cicloDias, setCicloDias] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const profile = useAuthStore((state) => state.profile);
  const location = useLocation();
  const isExtraIncome = location.pathname.includes("extra");

  // Función para agregar un ingreso
  const handleAddIngreso = async () => {
    const montoNumber = parseFloat(monto);
    const cicloNumber = parseInt(cicloDias, 10);

    if (isNaN(montoNumber) || montoNumber <= 0) {
      toast.error("Ingrese un monto válido.");
      return;
    }

    if (!isExtraIncome && (isNaN(cicloNumber) || cicloNumber <= 0)) {
      toast.error("Ingrese un ciclo de días válido.");
      return;
    }

    if (!descripcion.trim()) {
      toast.error("La descripción no puede estar vacía.");
      return;
    }

    const fechaActual = new Date().toISOString().split("T")[0];

    const data = {
      descripcion: isExtraIncome
        ? `Extra - ${descripcion}`
        : `Mensual - ${descripcion}`,
      monto: montoNumber,
      usuarioId: profile.id,
      ...(isExtraIncome
        ? { fechaEfectuada: fechaActual }
        : { fechaProgramada: fechaActual, cicloDias: cicloNumber }),
    };

    setIsSubmitting(true);
    if (isExtraIncome) {
      await addIncomeExtra(data);
    } else {
      await addIncome(data);
    }
    setMonto("");
    setCicloDias("");
    setDescripcion("");
    loadIncomes();

    setIsSubmitting(false);
  };

  // Función para cargar los ingresos
  const loadIncomes = async () => {
    if (!profile?.id) return;

    setLoading(true);
    const data = await getIncomes(profile.id);
    if (data) setIncomes(data);
    setLoading(false);
  };

  // Cargar los ingresos al montar el componente
  useEffect(() => {
    loadIncomes();
  }, []);

  return (
    <div className="w-full h-screen">
      <TotalIncome />
      <div className="pt-4 flex gap-6">
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />

        {!isExtraIncome && (
          <input
            type="number"
            placeholder="Ciclo de días"
            value={cicloDias}
            onChange={(e) => setCicloDias(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
        )}

        <button
          onClick={handleAddIngreso}
          disabled={isSubmitting}
          className={`ml-2 px-4 py-2 rounded-md ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          {isSubmitting ? "Cargando..." : "Agregar Ingreso"}{" "}
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-4">Cargando ingresos...</p>
      ) : incomes.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          No hay ingresos registrados.
        </p>
      ) : (
        <IncomeList incomes={incomes} isExtraIncome={isExtraIncome} />
      )}
    </div>
  );
};

export default IngresoItem;
