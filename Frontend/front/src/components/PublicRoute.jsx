import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = ({ isAllowed, children }) => {
  if (isAllowed) return <Navigate to={"/dashboard/ingresos/mensual"} />;
  return children ? <>{children}</> : <Outlet />;
};
