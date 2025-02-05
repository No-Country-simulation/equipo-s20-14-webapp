import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addIncome,
  addIncomeExtra,
  getIncomes,
} from "../actions/incomeActions";
import { useAuthStore } from "../store/auth";

const useIngresoItem = () => {
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cicloDias, setCicloDias] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const profile = useAuthStore((state) => state.profile);
  const location = useLocation();
  const isExtraIncome = location.pathname.includes("extra");

  const loadIncomes = async () => {
    if (!profile?.id) return;
    setLoading(true);
    const data = await getIncomes(profile.id);
    if (data) setIncomes(data);
    setLoading(false);
  };

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

  useEffect(() => {
    loadIncomes();
  }, []);

  return {
    monto,
    setMonto,
    descripcion,
    setDescripcion,
    cicloDias,
    setCicloDias,
    incomes,
    loading,
    isSubmitting,
    isExtraIncome,
    handleAddIngreso,
  };
};

export default useIngresoItem;
