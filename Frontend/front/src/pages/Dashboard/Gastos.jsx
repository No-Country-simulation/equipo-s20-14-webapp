import { useParams } from "react-router-dom";
import VistaGastos from "../../components/Vistas/VistaGastos";
import { Presupuesto } from "../../components/Presupuestos/Presupuesto";

export const Gastos = () => {
  const { categoria, id } = useParams();

  const idCategoria = parseInt(id);

  return (
    <div className="ml-10 mt-4">
      <h1 className="text-2xl pb-2">
        Gastos - <span className="capitalize">{categoria}</span>
      </h1>
      <Presupuesto categoria={categoria} idCategoria={idCategoria} />
      <VistaGastos categoria={categoria} idCategoria={idCategoria} />
    </div>
  );
};
