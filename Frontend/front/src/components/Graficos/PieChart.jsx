
import { Pie} from 'react-chartjs-2';
import { Chart as ChartJS,PointElement, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from "chart.js";


// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, PointElement,ArcElement,  LinearScale, BarElement, Title, Tooltip, Legend);

// Datos iniciales (mock) para probar el gráfico
var gastos=[

    { descripcion: 'Servicios', monto: 30 },
    { descripcion: 'Transporte', monto: 20 },
    { descripcion: 'Tarjetas/Crédito', monto: 60 },
    { descripcion: 'Hogar', monto: 50 },
    { descripcion: 'Otros', monto: 25 },
];

const coloresPie = [
    'rgba(255, 99, 132, 0.6)', // Rojo
    'rgba(54, 162, 235, 0.6)', // Azul
    'rgba(255, 206, 86, 0.6)', // Amarillo
    'rgba(75, 192, 192, 0.6)', // Verde
    'rgba(153, 102, 255, 0.6)', // Morado
    'rgba(255, 159, 64, 0.6)', // Naranja
    'rgba(199, 199, 199, 0.6)', // Gris
  ];

const PieChart = () => {

    const labels = gastos.map(gasto => gasto.descripcion); // Extraer descripciones
    const data = gastos.map(gasto => gasto.monto);      
    // Verificar que los datos estén correctamente formateados
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Gastos por Categoria',
                data: data,
                backgroundColor: coloresPie,
                borderColor: coloresPie.map(color => color.replace('0.6', '1')),
            },
        ],
    };

    const options = {
        responsive: true,
        plugins:{
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Reporte de Gastos Mensuales',
            },
        },
    };

    return <Pie data={chartData} options={options}/>;

};



export default PieChart;