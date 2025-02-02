import { budgetTotalByUserCategoryRequest } from "../api/budget";
import { toast } from "react-toastify";

export const loadBudgetTotalByUserCategory = async (idusuario, idCategoria) => {
  try {
    const { data } = await budgetTotalByUserCategoryRequest(idusuario, idCategoria);
    return data;
        
  } catch (error) {
    console.error("Error al obtener el presupuesto:", error);
    toast.error("No se pudo obtener el presupuesto.");
    return null;
  }
};