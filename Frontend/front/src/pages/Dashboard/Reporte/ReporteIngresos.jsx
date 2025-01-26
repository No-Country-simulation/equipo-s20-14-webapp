
import '../../style/ReporteIngreso.css';
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

const ReporteIngresos= () =>{

    const totalIngresos = ingresos.reduce((sum, item) => sum + item.monto, 0);
  

    const data = {
        labels: ingresos.map((ingreso) => ingreso.categoria),
        datasets: [
        {
            data:  ingresos.map((ingreso) => ingreso.monto),
            backgroundColor: coloresPie.slice(0, ingresos.length),
            hoverBackgroundColor:coloresPie.slice(0, ingresos.length).map(color => color.replace("0.6", "1")),
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
            <h3>Ingresos</h3>
            {ingresos.map((ingreso, index) => (
                <p key={index}>
                    <strong>Ingreso {ingreso.categoria}:</strong> ${ingreso.monto}
                </p>
            ))}
            <p><strong>Total de Ingreso:</strong>${totalIngresos}</p>
          
        </div>
  
        {/* Gráfico de Tortas */}
        <div className="pie">
          <h3 className="distribucion">Distribución</h3>
          <Pie data={data} options={options} />
        </div>
  
      </div>
    );
    
}

export default ReporteIngresos;