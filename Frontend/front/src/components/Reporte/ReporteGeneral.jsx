import '../../style/ReporteGeneral.css';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


const coloresPie = [
    'rgba(255, 99, 132, 0.6)', // Rojo
    'rgba(54, 162, 235, 0.6)', // Azul
    'rgba(255, 206, 86, 0.6)', // Amarillo
    'rgba(75, 192, 192, 0.6)', // Verde
    'rgba(153, 102, 255, 0.6)', // Morado
    'rgba(255, 159, 64, 0.6)', // Naranja
    'rgba(199, 199, 199, 0.6)', // Gris
];

// Datos de ejemplo para los ingresos y gastos
const ingresos = [
  {categoria: "Mensual", monto: 100 },
  {categoria: "Quincenal", monto: 90 },
  {categoria: "Extra", monto: 40 }
];

const gastos = [
  { categoria: " Servicios", monto: 60},
  { categoria: "Transporte", monto: 80},
  { categoria: "Tarjetas/Crédito", monto: 150},
  { categoria: "Hogar", monto: 300},
  { categoria: "Otros", monto: 500},
];

const ReporteGeneral = () => {
  

  const totalIngresos = ingresos.reduce((sum, item) => sum + item.monto, 0);
  const totalGastos = gastos.reduce((sum, item) => sum + item.monto, 0);
  const balance = totalIngresos - totalGastos;

  const data = {
    labels: ["Ingresos", "Gastos"],
    datasets: [
      {
        data: [totalIngresos, totalGastos],
        backgroundColor: coloresPie.slice(0, 2),
        hoverBackgroundColor:coloresPie.slice(0, 2).map(color => color.replace("0.6", "1")),
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
        text: "Reporte General",
      },
    },
  };

  return (
    <div className="contenedor">
      <h2 className="titulo">Reporte General</h2>

      {/* Resumen del Balance */}
      <div className="balance-resumen">
        <p><strong>Total de Ingresos:</strong> ${totalIngresos}</p>
        <p><strong>Total de Gastos:</strong> ${totalGastos}</p>
        <p><strong>Balance:</strong> ${balance}</p>
      </div>

      {/* Gráfico de Tortas */}
      <div className="pie">
        <h3 className="distribucion">Distribución</h3>
        <Pie data={data} options={options} />
      </div>

    </div>
  );
};
export default ReporteGeneral;


