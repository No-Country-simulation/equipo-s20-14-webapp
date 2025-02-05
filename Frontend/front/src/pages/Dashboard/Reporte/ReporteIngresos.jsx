import "../../../style/ReporteIngreso.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { useAuthStore } from "../../../store/auth";
import { useState, useEffect } from "react";

import { getIngresoList } from "../../../api/financialApi";

const coloresPie = [
  "rgba(255, 99, 132, 0.6)", // Rojo
  "rgba(54, 162, 235, 0.6)", // Azul
  "rgba(255, 206, 86, 0.6)", // Amarillo
  "rgba(75, 192, 192, 0.6)", // Verde
  "rgba(153, 102, 255, 0.6)", // Morado
  "rgba(255, 159, 64, 0.6)", // Naranja
  "rgba(199, 199, 199, 0.6)", // Gris
];

const ReporteIngresos = () => {
  const profile = useAuthStore((state) => state.profile);

  const [ingresos, setIngresos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngresos = async () => {
      try {
        if (profile?.id && profile?.token) {
          const data = await getIngresoList(profile.id);
          setIngresos(data);
        }
      } catch (error) {
        console.log("Error al cargar los ingresos: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIngresos();
  }, [profile?.id]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-center text-gray-500 mt-4">Cargando reporte...</p>
      </div>
    );
  }

  if (ingresos.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No hay ingresos registrados.
      </p>
    );
  }

  const totalIngresos = ingresos.reduce((sum, item) => sum + item.monto, 0);

  // Preparación de los datos para el gráfico de torta
  const data = {
    labels: ingresos.map((ingreso) => ingreso.descripcion),
    datasets: [
      {
        data: ingresos.map((ingreso) => ingreso.monto),
        backgroundColor: coloresPie.slice(0, ingresos.length),
        hoverBackgroundColor: coloresPie
          .slice(0, ingresos.length)
          .map((color) => color.replace("0.6", "1")),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Reporte General de Ingresos",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            // Agregar el signo $ antes del monto
            return "$" + tooltipItem.raw.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div className="w-full px-10">
      <h2 className="titulo">Reporte General de Ingresos</h2>

      {/* Resumen del Balance */}
      <div className="w-9/12 mx-auto py-10 flex justify-between ">
        <div className="w-3/12">
          <h3 className="font-bold text-4xl">Ingresos</h3>
          <div className="py-4">
            {ingresos.map((ingreso, index) => (
              <p key={index} className="text-lg text-gray-500">
                <strong> {ingreso.descripcion}: </strong> ${ingreso.monto}
              </p>
            ))}
          </div>
          <p className="font-semibold text-lg text-gray-700">
            <strong>Total de Ingreso: ${totalIngresos}</strong>
          </p>
        </div>
        {/* Gráfico de Tortas */}
        <div className="w-[400px]">
          <h3 className="distribucion">Distribución de Ingresos</h3>
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ReporteIngresos;
