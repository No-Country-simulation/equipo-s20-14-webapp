import { toast } from "react-toastify";
import { getGastosRequest } from "../api/financialApi";

export const getGastos = async (usuarioId) => {
  try {
    const { data } = await getGastosRequest(usuarioId);
    return data;
  } catch (error) {
    console.error("Error obteniendo los gastos:", error);
    toast.error("No se pudieron obtener los gatos.");
    throw error;
  }
};
