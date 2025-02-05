
import '../../../style/ReporteIngreso.css';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import { useAuthStore } from '../../../store/auth';
import { useState, useEffect } from 'react';

import { getIngresoList } from '../../../api/financialApi';



const coloresPie = [
    'rgba(255, 99, 132, 0.6)', // Rojo
    'rgba(54, 162, 235, 0.6)', // Azul
    'rgba(255, 206, 86, 0.6)', // Amarillo
    'rgba(75, 192, 192, 0.6)', // Verde
    'rgba(153, 102, 255, 0.6)', // Morado
    'rgba(255, 159, 64, 0.6)', // Naranja
    'rgba(199, 199, 199, 0.6)', // Gris
];


const ReporteIngresos= () =>{

    const profile = useAuthStore((state) => state.profile);
    console.log("Profile en useAuthStore:", profile);

    const [ingresos, setIngresos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIngresos = async () => {
            try {
                if (profile?.id && profile?.token) {
                    const data= await getIngresoList(profile.id);
                    console.log("Ingresos cargados:", data);
                    setIngresos(data);
                };
        
            } catch (error) {
            console.log("Error al cargar los ingresos: ", error);
            } finally { 
                setLoading(false);
            }
        }
        fetchIngresos();
    },[profile?.id]);  
    

    if (loading) {
        return <p className="text-center text-gray-500 mt-4">Cargando reporte...</p>;
    }

    if (ingresos.length === 0) {
        return <p className="text-center text-gray-500 mt-4">No hay ingresos registrados.</p>;
    }

    const totalIngresos = ingresos.reduce((sum, item) => sum + item.monto, 0);


    // Preparación de los datos para el gráfico de torta
    const data = {
        labels: ingresos.map((ingreso) => ingreso.descripcion),
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
                text: "Reporte General de Ingresos",
            },
            tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    // Agregar el signo $ antes del monto
                    return '$' + tooltipItem.raw.toLocaleString();
                  },
                }
            }
        }
    };


    return (
        <div className="contenedor">
        <h2 className="titulo">Reporte General de Ingresos</h2>
  
        {/* Resumen del Balance */}
        <div className="balance-resumen">
            <h3>Ingresos</h3>
            <div className='ingresos-scroll'>
            {ingresos.map((ingreso, index) => (
                <p key={index}>
                    <strong> {ingreso.descripcion}: </strong> ${ingreso.monto}
                </p>
            ))}
            </div>
            <p><strong>Total de Ingreso: ${totalIngresos}</strong></p>
          
        </div>
  
        {/* Gráfico de Tortas */}
        <div className="pie">
          <h3 className="distribucion">Distribución de Ingresos</h3>
          <Pie data={data} options={options} />
        </div>
  
      </div>
    );
    
}

export default ReporteIngresos;