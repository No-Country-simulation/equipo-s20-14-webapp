import { Card, CardContent } from "../../components/ui/card";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Dashboard } from "../../pages/Dashboard/Dashboard";
import { useEffect, useState } from "react";
import { getGastosRequest, getIngresosRequest } from "../../api/financialApi";


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const VistaGeneral = () => {
  const [gastos, setGastos] = useState([]);
  const [ingresos, setIngresos] = useState([]);

  // Datos para el gráfico de torta (gastos por categoría)
  const pieData = {
    labels: ["Servicios", "Movilidad", "Tarjetas de crédito", "Otros"],
    datasets: [
      {
        label: "Gastos",
        data: gastos.map(item => item.categoria), // Reemplazar con datos dinámicos del backend
        backgroundColor: ["#f87171", "#60a5fa", "#facc15", "#4ade80"],
        borderColor: ["#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  // Datos para el gráfico de barras (ingresos y gastos mensuales)
  const barData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Ingresos",
        data: ingresos.map(item => item.monto),
        backgroundColor: "#4ade80",
      },
      {
        label: "Gastos",
        data: gastos.map(item => item.monto),
        backgroundColor: "#f87171",
      },
    ],
  };

  useEffect(() => {
    
    //Obtener los gastos
    const usuarioId = '123';
    getGastosRequest(usuarioId)
    .then((gastosData) => {
      if (Array.isArray(gastosData)) {
        setGastos(gastosData);
      } else {
        console.error("Datos de gastos no son un array");
      }
      
    })//asumiendo que el backend devuelve un array de objetos con datos de ingresos
    .catch((error) => console.error(error));

    // Obtener los ingresos
    
    getIngresosRequest(usuarioId)
      .then((ingresosData) => {
        if (Array.isArray(ingresosData)) {
          setIngresos(ingresosData);
        } else {
          console.error("Datos de ingresos no son un array");
        }
    })  // Asumiendo que el backend devuelve un array de objetos con datos de ingresos
      .catch((error) => console.error(error))
    
  },[]);

  

  return (
    <div className="flex min-h-screen">
      <div>
      <Dashboard className="w-1/5 bg-gray-800" />
      </div>
      <div className=" p-6 space-y-8 bg-white rounded-lg shadow-md flex-grow">
        <h2 className="text-xl font-semibold mb-4">Resumen Financiero</h2>

        {/* Resumen Financiero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto max-h-[400px] overflow-auto w-3/4 ">
          <Card className="bg-green-100">
            <CardContent>
              <h3 className="text-lg font-semibold">Ingresos Totales</h3>
              <p className="text-2xl font-bold">${ingresos.length > 0 ? ingresos.reduce((acc, ingreso) =>  acc + ingreso.monto, 0) : 0}</p>
            </CardContent>
          </Card>
          <Card className="bg-red-100">
            <CardContent>
              <h3 className="text-lg font-semibold">Gastos Totales</h3>
              <p className="text-2xl font-bold">${gastos.length > 0 ? gastos.reduce((acc, gasto) => acc + gasto.monto, 0) : 0}</p>
            </CardContent>
          </Card>
          
          {/*Saldo*/}
          <Card className="bg-blue-100">
            <CardContent>
              <h3 className="text-lg font-semibold">Saldo</h3>
              <p className="text-2xl font-bold">
                ${ingresos.length > 0 || gastos.length > 0 ? ingresos.reduce((acc, ingreso) => acc + ingreso.monto, 0) - gastos.reduce((acc, gasto) => acc + gasto.monto, 0) : 0}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Tortas */}
        <div className="bg-white p-6 rounded-2xl shadow-md w-3/4 mx-auto">
          <h3 className="text-lg font-semibold mb-4">Distribución de Gastos</h3>
          <Pie data={pieData} />
        </div>

        {/* Gráfico de Barras */}
        <div className="bg-white p-6 rounded-2xl shadow-md w-3/4 mx-auto">
          <h3 className="text-lg font-semibold mb-4">
            Ingresos vs Gastos Mensuales
          </h3>
          <Bar data={barData} />
        </div>

        {/* Últimas Operaciones */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Últimas Operaciones</h3>
          <ul className="space-y-2">
            <li className="flex justify-between border-b pb-2">
              <span className="font-medium">Compra en supermercado</span>
              <span className="text-red-500">- $100</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span className="font-medium">Pago de sueldo</span>
              <span className="text-green-500">+ $500</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span className="font-medium">Carga de combustible</span>
              <span className="text-red-500">- $50</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default VistaGeneral;
