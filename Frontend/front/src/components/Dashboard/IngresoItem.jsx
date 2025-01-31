import React, { useState } from "react";
import { toast } from "react-toastify";
import { addIncome } from "../../actions/incomeActions";
import { useAuthStore } from "../../store/auth";
import { createExtraIncome } from "../../api/income";

const IngresoItem = ({ tipo }) => {
  const [monto, setMonto] = useState("");
  const [ingresoGuardado, setIngresoGuardado] = useState(null);
  const profile = useAuthStore((state) => state.profile);

  const handleAddIngreso = () => {
    const montoNumber = parseFloat(monto);
    if (isNaN(montoNumber) || montoNumber <= 0) {
      toast.error("Ingrese un monto válido.");
      return;
    }

    setIngresoGuardado(montoNumber.toFixed(2));
    setMonto("");
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

    const ingresoData = {
      descripcion: `Ingreso ${tipo}`,
      fechaEfectuada: new Date().toISOString().split("T")[0],
      monto: parseFloat(ingresoGuardado),
      usuarioId: profile.id,
    };

    const data = await createExtraIncome(ingresoData);

    console.log(data);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Monto"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        className="px-4 py-2 border rounded-md"
      />
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
              <th className="border-b py-2 px-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b py-2 px-4 capitalize">{tipo}</td>
              <td className="border-b py-2 px-4">${ingresoGuardado}</td>
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
