import { useParams } from "react-router-dom";
import VistaServicios from "../../components/Vistas/VistaServicios";
import { Presupuesto } from "../../components/Presupuestos/Presupuesto";

export const Gastos = () => {
  const { categoria, id } = useParams();

  return (
    <div className="ml-10 mt-4">
      <h1 className="text-2xl pb-2">
        Gastos - <span className="capitalize">{categoria}</span>
      </h1>
        <Presupuesto categoria={categoria} idCategoria={id}/>
        <VistaServicios categoria={categoria} idCategoria={id} />
    </div>
  );
};
