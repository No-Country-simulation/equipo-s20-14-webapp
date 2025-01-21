import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const IngresoItem = ({ tipo }) => {
  const [monto, setMonto] = useState("");
  const [ingresos, setIngresos] = useState([]);

  useEffect(() => {
    setIngresos([]);
  }, [tipo]);

  const handleAddIngreso = () => {
    if (monto) {
      setIngresos([
        ...ingresos,
        { tipo, monto: parseFloat(monto), id: Date.now() },
      ]);
      setMonto("");
    }
  };

  const handleDeleteIngreso = (id) => {
    setIngresos(ingresos.filter((ingreso) => ingreso.id !== id));
    toast.warn("Eliminado correctamente.");
  };

  const handleSaveIngreso = () => {
    toast.success("Ingresos guardados correctamente.");
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

      <table className="min-w-full mt-6 border-collapse">
        <thead>
          <tr>
            <th className="border-b py-2 px-4 text-left">Ingresos</th>
            <th className="border-b py-2 px-4 text-left">Monto</th>
            <th className="border-b py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingresos.map((ingreso) => (
            <tr key={ingreso.id}>
              <td className="border-b py-2 px-4 capitalize">{ingreso.tipo}</td>
              <td className="border-b py-2 px-4">
                ${ingreso.monto.toFixed(2)}
              </td>
              <td className="border-b py-2 px-4">
                <button
                  onClick={() => handleDeleteIngreso(ingreso.id)}
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngresoItem;
