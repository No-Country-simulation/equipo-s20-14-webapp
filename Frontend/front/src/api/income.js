import claraApi from "../libs/claraApi";

export const fetchIncomes = async (usuarioId) => {
  return await claraApi.get(`/operaciones/lista/ingresos/${usuarioId}`);
};

export const createIncome = async (incomeData) => {
  return await claraApi.post(
    "/operaciones/lista/ingresos/{usuarioId}",
    incomeData
  );
};
