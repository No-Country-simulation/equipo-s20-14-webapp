import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { addIncome, addIncomeExtra } from "../../actions/incomeActions";
import { useAuthStore } from "../../store/auth";
import IncomeList from "./IncomeList";

const IngresoItem = ({ tipo }) => {
  const [monto, setMonto] = useState("");
  const [cicloDias, setCicloDias] = useState("");
  const [ingresoGuardado, setIngresoGuardado] = useState(null);
  const profile = useAuthStore((state) => state.profile);
  const location = useLocation();
  const isExtraIncome = location.pathname.includes("extra");

  const handleAddIngreso = () => {
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

    setIngresoGuardado({
      monto: montoNumber.toFixed(2),
      cicloDias: !isExtraIncome ? cicloNumber : null,
    });

    setMonto("");
    setCicloDias("");
  };

  const handleDeleteIngreso = () => {
    setIngresoGuardado(null);
    toast.warn("Ingreso eliminado.");
  };

  const handleSaveIngreso = async () => {
    if (!profile || !profile.id) {
      toast.error("Error: Usuario no identificado.");
      return;
    }

    if (!ingresoGuardado) {
      toast.error("No hay monto para guardar.");
      return;
    }

    const fechaActual = new Date().toISOString().split("T")[0];

    if (isExtraIncome) {
      const extraIncomeData = {
        descripcion: `Ingreso Extra ${tipo}`,
        fechaEfectuada: fechaActual,
        monto: parseFloat(ingresoGuardado.monto),
        usuarioId: profile.id,
      };
      await addIncomeExtra(extraIncomeData);
    } else {
      const fixedIncomeData = {
        descripcion: `Ingreso Fijo ${tipo}`,
        fechaProgramada: fechaActual,
        cicloDias: ingresoGuardado.cicloDias,
        monto: parseFloat(ingresoGuardado.monto),
        usuarioId: profile.id,
      };
      await addIncome(fixedIncomeData);
    }

    setIngresoGuardado(null);
    setMonto("");
    setCicloDias("");
  };

  return (
    <div>
      <IncomeList />
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
          className="ml-2 px-4 py-2 border rounded-md"
        />
      )}

      <button
        onClick={handleAddIngreso}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Agregar Ingreso
      </button>

      {ingresoGuardado && (
        <table className="min-w-full my-6 border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2 px-4 text-left">Tipo</th>
              <th className="border-b py-2 px-4 text-left">Monto</th>
              {!isExtraIncome && (
                <th className="border-b py-2 px-4 text-left">Ciclo de Días</th>
              )}
              <th className="border-b py-2 px-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b py-2 px-4 capitalize">{tipo}</td>
              <td className="border-b py-2 px-4">${ingresoGuardado.monto}</td>
              {!isExtraIncome && (
                <td className="border-b py-2 px-4">
                  {ingresoGuardado.cicloDias}
                </td>
              )}
              <td className="border-b py-2 px-4">
                <button
                  onClick={handleDeleteIngreso}
                  className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Eliminar
                </button>
                <button
                  onClick={handleSaveIngreso}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Guardar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IngresoItem;
