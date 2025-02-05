import claraApi from "../libs/claraApi";

export const fetchIncomes = async (usuarioId) => {
  return await claraApi.get(`/operaciones/lista/ingresos/${usuarioId}`);
};

export const createIncome = async (incomeData) => {
  return await claraApi.post(`/operaciones/crear/ingresofijo`, incomeData);
};

export const createExtraIncome = async (incomeData) => {
  return await claraApi.post(`/operaciones/crear/ingreso`, incomeData);
};

export const fetchTotalIncomes = async (usuarioId) => {
  return await claraApi.get(`/operaciones/total/ingresos/${usuarioId}`);
};