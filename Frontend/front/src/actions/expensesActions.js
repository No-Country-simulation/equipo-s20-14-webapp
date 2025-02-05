import { toast } from "react-toastify";
import { createExpense, fetchExpensesByUser, removeExpense } from "../api/expenses";

export const addExpense = async (gasto) => {
  try {
    const { data } = await createExpense(gasto);
    toast.success("Gasto agregado correctamente.");
    return data;
  } catch (error) {
    console.error("Error al crear gasto:", error);
    toast.error("No se pudo agregar el gasto.");
    return null;
  }
};

export const getExpensesByUser = async (usuarioId) => {
  try {
    const { data } = await fetchExpensesByUser(usuarioId);
    return data;
  } catch (error) {
    console.error("Error al obtener los gastos:", error);
    toast.error("No se pudieron obtener los gastos.");
    return null;
  }
};

export const deleteExpense = async (usuarioId) => {
    try {
      await removeExpense(usuarioId);
      toast.success("Gasto agregado correctamente.");
    } catch (error) {
      console.error("Error al borrar el gasto:", error);
      toast.error("No se pudo borrar el gasto.");
    }
  };