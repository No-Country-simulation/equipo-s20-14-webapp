import LineChart from "./Graficos/LineChart";
import '../style/RepMensual.css';


const RepMensual = () =>{

    return <div className="reporte-container">
        <h1>Reporte Mensual</h1>
        <div className="line">
        <LineChart/>
        
        </div>
    </div>
}

export default RepMensual;