import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { getGastos } from "../../../actions/reportesAction";
import { useAuthStore } from "../../../store/auth";
import "../../../style/ReporteGastos.css";
import { useCategoryStore } from "../../../store/category";
ChartJS.register(ArcElement, Tooltip, Legend);

const coloresPie = [
  "rgba(255, 99, 132, 0.6)", // Rojo
  "rgba(54, 162, 235, 0.6)", // Azul
  "rgba(255, 206, 86, 0.6)", // Amarillo
  "rgba(75, 192, 192, 0.6)", // Verde
  "rgba(153, 102, 255, 0.6)", // Morado
  "rgba(255, 159, 64, 0.6)", // Naranja
  "rgba(199, 199, 199, 0.6)", // Gris
];

const ReporteGastos = () => {
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const profile = useAuthStore((state) => state.profile);
  const categorias = useCategoryStore((state) => state.categorias);

  useEffect(() => {
    const fetchData = async () => {
      if (profile?.id && profile?.token) {
        const gastosData = await getGastos(profile.id);
        setGastos(gastosData.data);
      }

      setLoading(false);
    };
    fetchData();
  }, [profile]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-center text-gray-500 mt-4">Cargando reporte...</p>
      </div>
    );
  }

  // Agrupar gastos por categoria y calcular el total por cada categoria
  const gastosPorCategoria = categorias.map((categoria) => {
    const totalCategoria = gastos
      .filter((gasto) => gasto.categoryId === categoria.id)
      .reduce((sum, gasto) => sum + gasto.amount, 0);

    return {
      categoria,
      total: totalCategoria,
    };
  });

  // Configuración del gráfico de torta
  const data = {
    labels: categorias.map((categoria) => categoria.name),
    datasets: [
      {
        data: gastosPorCategoria.map((gasto) => gasto.total),
        backgroundColor: coloresPie.slice(0, categorias.length),
        hoverBackgroundColor: coloresPie
          .slice(0, categorias.length)
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
        text: "Reporte Gastos por Categoría",
      },
    },
  };

  return (
    <div className="w-6/12 mx-auto h-screen">
      <h2 className="titulo">Reporte Total de Gastos</h2>

      {/* Resumen del Balance */}
      <div className="w-full rounded-lg border-2 mb-4">
        <h3 className="w-full rounded-tr-lg rounded-tl-lg font-bold text-gray-50 bg-gray-900 text-center">
          Gastos por Categoría
        </h3>
        <div className="grid grid-cols-2 gap-4 p-4">
          {gastosPorCategoria.map((gasto, index) => (
            <div key={index} className="categoria-item">
              <p>
                <strong>{gasto.categoria.name}:</strong> ${gasto.total}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Gráfico de Tortas */}
      <div className="w-full h-96 flex flex-col items-center">
        <h3 className="distribucion">Distribución por Categoría</h3>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ReporteGastos;
