import BarChart from "./Graficos/BarChart"
import '../style/RepSemanal.css';

const RepSemanal= () =>{
    return <div className="reporte-container">
            <h1>Reporte Semanal</h1>
            <div className="bar">
            
            <BarChart/>
            </div>
        </div>
}

export default RepSemanal;