import { toast } from "react-toastify";
import { createIncome, fetchIncomes } from "../api/income";

export const getIncomes = async () => {
  try {
    const { data } = await fetchIncomes();
    return data;
  } catch (error) {
    console.error("Error al obtener ingresos:", error);
    toast.error("No se pudieron obtener los ingresos.");
    return null;
  }
};

export const addIncome = async (incomeData) => {
  try {
    const { data } = await createIncome(incomeData);
    toast.success("Ingreso agregado correctamente.");
    return data;
  } catch (error) {
    console.error("Error al crear ingreso:", error);
    toast.error("No se pudo agregar el ingreso.");
    return null;
  }
};
