import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import '../../../style/ReporteGastos.css';


const coloresPie = [
    'rgba(255, 99, 132, 0.6)', // Rojo
    'rgba(54, 162, 235, 0.6)', // Azul
    'rgba(255, 206, 86, 0.6)', // Amarillo
    'rgba(75, 192, 192, 0.6)', // Verde
    'rgba(153, 102, 255, 0.6)', // Morado
    'rgba(255, 159, 64, 0.6)', // Naranja
    'rgba(199, 199, 199, 0.6)', // Gris
];


const gastos = [
    { categoria: " Servicios", monto: 60},
    { categoria: "Transporte", monto: 80},
    { categoria: "Tarjetas/Crédito", monto: 150},
    { categoria: "Hogar", monto: 300},
    { categoria: "Otros", monto: 500},
];


  
const ReporteGastos = () =>{
   
  const totalGastos = gastos.reduce((sum, item) => sum + item.monto, 0);
 

  const data = {
    labels: gastos.map((gasto) => gasto.categoria),
    datasets: [
      {
        data: gastos.map((gasto) => gasto.monto),
        backgroundColor: coloresPie.slice(0, gastos.length),
        hoverBackgroundColor:coloresPie.slice(0, gastos.length).map(color => color.replace("0.6", "1")),
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
        text: "Reporte Gastos",
      },
    },
  };


  return (

    <div className="contenedor">
      <h2 className="titulo">Reporte Total de Gastos</h2>

      {/* Resumen del Balance */}
      <div className="balance-resumen">
        <h3>Gastos</h3>
            
        {gastos.map((gasto, index) => (
            <p key={index}>
              <strong>Gasto {gasto.categoria}:</strong> ${gasto.monto}
            </p>
          )
        )}
        <p><strong>Total de Gastos:</strong>${totalGastos}</p>
            
      </div>

        {/* Gráfico de Tortas */}
        <div className="pie">
            <h3 className="distribucion">Distribución</h3>
            <Pie data={data} options={options} />
        </div>

    </div>

  );
    
}

export default ReporteGastos;