import { useState }from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale } from 'chart.js';
import '../style/VistaPresupuesto.css';

// Registrar los componentes necesarios
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale);

const VistaPresupuesto = () => {
    //Estado para reporte seleccionado
    const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
    //Estado para subCategorias visibles
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const subreportes = ["Mensual", "Semanal", "Diario"];


    //Estado de gráficos y categorias
    const [chartData, /*setChartData*/] = useState({
        labels: ['Ingresos', 'Gastos', 'Diferencia'],
        datasets: [
            {
                label: "Vista Presupuesto",
                data: [10, 30, 60],//inicializado en 0
                backgroundColor: ['#4CAF50', '#F44336', '#2196F3'],
                hoverBackgroundColor: ['#66BB6A', '#EF5350', '#42A5F5'],
            },
        ],
    });
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
        },
    };

    
    //Categorias y subcategorias
    const categorias = {
        ingresos: ['Mensual', 'Quincenal', 'Extra'],
        gastos: ['Servicios', "Transporte", "Tarjetas/Crédito", "Hogar", "Otros"],
        presupuesto: ['Mensual', 'Semanal', 'Diario'],
    };

    const reporte = {
        subreporte: ['Mensual', 'Semanal', 'Diario'],
    };

    //Función para manejar el click en una categoria
    const handleCategoriaClick = (categoria) => {
        setCategoriaSeleccionada(categoria === categoriaSeleccionada ? null : categoria);
    };

    //Función para manejar el click en reporte
    const handleReporteClick = (reporte) => {
        setReporteSeleccionado(reporte === categoriaSeleccionada ? null : "reporte");
    };



    return (
        <div className="vista-container">
            <h1>Vista General</h1>

            <div className="vista-grid">

                {/* Gráfico de Pie */}
                <div className="grafico-container">
                    <Pie data={chartData} options={options} />
                </div>

                {/*Categorias*/}
                <div className="categorias">
                    <h2>Categorias</h2>
                    {Object.keys(categorias).map((categoria, index) => (
                        <div key={index}>
                            {/*categoria principal*/}
                            <h3
                            className={`categoria-titulo ${
                                categoriaSeleccionada === categoria ?'categoria-activa' : '' }`}
                                style={{ cursor: 'pointer' }}
                            onClick={() => handleCategoriaClick(categoria)}
                            >
                                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                            </h3>

                            {/*subcategorias*/}
                            {categoriaSeleccionada === categoria && (
                                <ul>
                                    {categorias[categoria].map((subcategoria, index) => (
                                        <li key={index}>
                                            {subcategoria}
                                        </li>
                                    ))}
                                </ul>
                            )}

                        </div>    
                    ))}


                <div className="calendario">
                    <h3>Calendario</h3>

                </div>

                <div className="reporte">
                    <h3 className={`reporte-titulo${
                        reporteSeleccionado === reporte ?'reporte-activo' : '' }`}
                        style={{ cursor: 'pointer' }}
                        onClick={handleReporteClick}
                        >
                            Reporte
                        </h3>    
                        {reporteSeleccionado && (
                            <ul>
                                {subreportes.map((subreporte, index) =>(
                                    <li key={index}>{subreporte}</li>
                                ))}
                            </ul>
                        )}
                    

                    {/*subreporte*/}
                    {reporteSeleccionado === reporte && (
                                <ul>
                                    {reporte[reporte].map((subreporte, index) => (
                                        <li key={index}>
                                            {subreporte}
                                        </li>
                                    ))}
                                </ul>
                            )}
                </div>
            </div>
            </div>

        </div>
    )
}

export default VistaPresupuesto;