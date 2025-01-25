import PieChart from './Graficos/PieChart';
import '../style/RepDiario.css';

const RepDiario= () =>{
    return <div className="reporte-container">
            <h1>Reporte Diario</h1>
            <div className="pie">
            
            <PieChart/>
            </div>
        </div>
}

export default RepDiario;