import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, Filler, PointElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale,LineElement,Filler, PointElement, LinearScale, BarElement, Title, Tooltip, Legend);

//Datos de prueba
var gastosMensuales=[
    { descripcion: 'Enero', monto: 20 },
    { descripcion: 'Febrero', monto: 50 },
    { descripcion: 'Marzo', monto: 60 },
    { descripcion: 'Abril', monto: 10 },
    { descripcion: 'Mayo', monto: 30 },
    { descripcion: 'Junio', monto: 90 },
    { descripcion: 'Julio', monto: 25 },
    { descripcion: 'Agosto', monto: 45 },
    { descripcion: 'Septiembre', monto: 80 },
    { descripcion: 'Octubre', monto: 60 },
    { descripcion: 'Noviembre', monto: 10 },
    { descripcion: 'Diciembre', monto: 70 },
];
const labelsMensuales = gastosMensuales.map(item => item.descripcion);
const dataMensuales = gastosMensuales.map(item => item.monto);

var miData = {
    labels: labelsMensuales,
    datasets: [
        {
            label: 'Gastos Mensuales',
            data: dataMensuales,
            tension: 0.5,
            fill: true,
            borderColor:'rgba(75, 192, 192, 1)',
            backgroundColor:'rgba(75, 192, 192, 0.6)',
            pointRadius: 5,
            pointBorderColor:'rgba(255, 99, 132)',
            pointBackgroundColor:'rgba(255, 99, 132)',
        }
    ]
}

var options={
    responsive: true,
    scales: {
        y: {
            min: 0
        },
        x: {
            ticks: {color:'blue'}
        },
    },
    plugins: {
        legend: {
            display: false
        },
    },
};

export default function LineChart(){
    return <Line data={miData} options={options}/>
}

LineChart.propTypes = {
    data: PropTypes.shape({
      labels: PropTypes.arrayOf(PropTypes.string).isRequired,
      datasets: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          data: PropTypes.arrayOf(PropTypes.number).isRequired,
          borderColor: PropTypes.string.isRequired,
          backgroundColor: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  };