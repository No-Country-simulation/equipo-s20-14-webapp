import { useParams } from "react-router-dom";

export const Gastos = () => {
  const { tipo } = useParams();

  return (
    <div className="ml-10 mt-4">
      <h1 className="pb-2">
        Gastos - <span className="capitalize">{tipo}</span>
      </h1>
    </div>
  );
};
