import { toast } from "react-toastify";
import { createExtraIncome, createIncome, fetchIncomes, fetchTotalIncomes } from "../api/income";

export const getIncomes = async (usuarioId) => {
  try {
    const { data } = await fetchIncomes(usuarioId);
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

export const addIncomeExtra = async (incomeData) => {
  try {
    const { data } = await createExtraIncome(incomeData);
    toast.success("Ingreso agregado correctamente.");
    return data;
  } catch (error) {
    console.error("Error al crear ingreso:", error);
    toast.error("No se pudo agregar el ingreso.");
    return null;
  }
};

export const getTotalIncomes = async (usuarioId) => {
  try {
    const { data } = await fetchTotalIncomes(usuarioId);
    return data;
  } catch (error) {
    console.error("Error al obtener el total de ingresos:", error);
    toast.error("No se pudo obtener el total de ingresos.");
    return null;
  }
};