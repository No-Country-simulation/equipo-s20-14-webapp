
import '../../../style/ReporteIngreso.css';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import { useAuthStore } from '../../../store/auth';
import { useState, useEffect } from 'react';

import { getIngresosRequest } from '../../../api/financialApi';



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
    const [ingresos, setIngresos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIngresos = async () => {
            if (profile?.id) {
                const data= await getIngresosRequest(profile.id);
                setIngresos(Array.isArray(data) ? data : []);
                
            }
            setLoading(false);
        };

        fetchIngresos();
    }, [profile?.id]);

    if (loading) {
        return <p className="text-center text-gray-500 mt-4">Cargando reporte...</p>;
    }

    if (ingresos.length === 0) {
        return <p className="text-center text-gray-500 mt-4">No hay ingresos registrados.</p>;
    }

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