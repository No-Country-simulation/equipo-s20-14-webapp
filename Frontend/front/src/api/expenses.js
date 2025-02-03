import claraApi from "../libs/claraApi";

export const createExpense = async (gastos) => {
  return await claraApi.post(`/operaciones/crear/gasto`, gastos);
};
export const getExpensesByUserCategory = async (usuarioId,categoriaId ) => {
  return await claraApi.get(`/operaciones/lista/gastos/${usuarioId}/categoria/${categoriaId}`);
};
