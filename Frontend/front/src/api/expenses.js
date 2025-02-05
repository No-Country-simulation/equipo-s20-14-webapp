import claraApi from "../libs/claraApi";

export const createExpense = async (gastos) => {
  return await claraApi.post("/transaction/create", gastos);
};
export const fetchExpensesByUser = async (usuarioId ) => {
  return await claraApi.get(`/transaction/user?userId=${usuarioId}`);
};
export const removeExpense = async (idExpense ) => {
  return await claraApi.delete(`/transaction/${idExpense}`);
};