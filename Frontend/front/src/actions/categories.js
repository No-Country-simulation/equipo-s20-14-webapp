import { categoryRequest } from "../api/category";
import { toast } from "react-toastify";
import { useCategoryStore } from "../store/category";

export const loadCategories = async (idusuario) => {
  try {
    const { data } = await categoryRequest(idusuario);
    return data
  } catch (error) {
    console.error("Error al obtener las categorias:", error);
    // toast.error("No se pudieron obtener las categorias.");
    return null;
  }
};
