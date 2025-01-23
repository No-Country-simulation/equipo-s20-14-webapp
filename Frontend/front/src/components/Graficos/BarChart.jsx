
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS,PointElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from "chart.js";
import PropTypes from 'prop-types';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, PointElement,LinearScale, BarElement, Title, Tooltip, Legend);

const coloresBarras = [
    'rgba(255, 99, 132, 0.6)', // Rojo
    'rgba(54, 162, 235, 0.6)', // Azul
    'rgba(255, 206, 86, 0.6)', // Amarillo
    'rgba(75, 192, 192, 0.6)', // Verde
    'rgba(153, 102, 255, 0.6)', // Morado
    'rgba(255, 159, 64, 0.6)', // Naranja
    'rgba(199, 199, 199, 0.6)', // Gris
  ];
  

var gastosSemanal=[
    { descripcion: 'Domingo', monto: 20 },
    { descripcion: 'Lunes', monto: 50 },
    { descripcion: 'Martes', monto: 60 },
    { descripcion: 'Miércoles', monto: 10 },
    { descripcion: 'Jueves', monto: 30 },
    { descripcion: 'Viernes', monto: 90 },
    { descripcion: 'Sábados', monto: 25 },
];
const labelsSemanal= gastosSemanal.map(item => item.descripcion);
const dataSemanal = gastosSemanal.map(item => item.monto);

// Verificar que los datos estén correctamente formateados
var chartData = {
    labels: labelsSemanal,
        datasets: [
            {
                label: 'Gasto Semanal',
                data: dataSemanal,
                backgroundColor: coloresBarras,
                borderColor: coloresBarras.map(color => color.replace('0.6', '1')),
                borderWidth: 1,
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
                text: 'Reporte Semanal de Gastos',
            },
        },
    };

    
    
    export default function BarChart(){
        
        return <Bar data={chartData} options={options}/>;
        
    };

    BarChart.propTypes = {
        data: PropTypes.shape({
          labels: PropTypes.arrayOf(PropTypes.string).isRequired,
          datasets: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string.isRequired,
              data: PropTypes.arrayOf(PropTypes.number).isRequired,
              backgroundColor: PropTypes.string.isRequired,
              borderColor: PropTypes.string.isRequired,
            })
          ).isRequired,
        }).isRequired,
      };