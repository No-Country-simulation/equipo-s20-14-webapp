
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS,PointElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from "chart.js";
import PropTypes from 'prop-types';


// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, PointElement,LinearScale, BarElement, Title, Tooltip, Legend);

const coloresBarras = [
    'rgba(255, 99, 132, 0.6)', // Rojo
    'rgba(54, 162, 235, 0.6)', // Azul
];
  
export default function BarChart({ ingresos, gastos}){
    //Datos para el Gráfico
    const data = {
        labels: ['Ingresos', 'Gastos'],
        datasets: [
            {
                label: 'Presupuesto Mensual',
                data: [ingresos, gastos],
                backgroundColor: coloresBarras,
                borderColor: coloresBarras.map(color =>color.replace('0.6', '1')),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
           legend: {
            position: 'top',
           },
           title: {
            display: true,
            text: 'Comparación de Ingresos y Gastos',
           },
        },
    };
        
    return <Bar data={data} options={options}/>;
        
};

BarChart.propTypes = {
    ingresos: PropTypes.number.isRequired,
    gastos: PropTypes.number.isRequired,
};