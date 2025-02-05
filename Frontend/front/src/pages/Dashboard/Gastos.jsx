import { useParams } from "react-router-dom";
import VistaGastos from "../../components/Vistas/VistaGastos";
import { Presupuesto } from "../../components/Presupuestos/Presupuesto";

export const Gastos = () => {
  const { categoria, id } = useParams();

  return (
    <div className="ml-10 mt-4">
      <h1 className="text-3xl pb-2">
        Gastos - <span className="capitalize">{categoria}</span>
      </h1>
        <Presupuesto categoria={categoria} idCategoria={id}/>
        <VistaGastos categoria={categoria} />
    </div>
  );
};
