import { budgetTotalByUserCategoryRequest, createBudgetByCategory, updateBudgetByCategory } from "../api/budget";
import { toast } from "react-toastify";

export const loadBudgetTotalByUserCategory = async (idusuario, idCategoria) => {
  try {
        
    const data = await budgetTotalByUserCategoryRequest(idusuario, idCategoria);
    return data;
        
  } catch (error) {
    console.error("Error al obtener el presupuesto:", error);
    toast.error("No se pudo obtener el presupuesto.");
    return null;
  }
};

export const createBudget = async (presupuesto) => {
  try {
    const { data } = await createBudgetByCategory(presupuesto);
    
    toast.success("Presupuesto agregado correctamente.");
    return data;
    
  } catch (error) {
    console.error("Error al crear presupuesto:", error);
    toast.error("No se pudo agregar el presupuesto.");
    return null;
  }
};

export const updateBudget = async (presupuesto) => {
  try {
    await updateBudgetByCategory(presupuesto);    
    toast.success("Presupuesto modificado correctamente.");
    
  } catch (error) {
    console.error("Error al modificar presupuesto:", error);
    toast.error("No se pudo modificar el presupuesto.");
    return null;
  }
};