import { useParams } from "react-router-dom";

export const Gastos = () => {
  const { categoria } = useParams();

  return (
    <div className="ml-10 mt-4">
      <h1 className="pb-2">
        Gastos - <span className="capitalize">{categoria}</span>
      </h1>
    </div>
  );
};
