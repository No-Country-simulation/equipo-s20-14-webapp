import claraApi from "../libs/claraApi";

export const budgetTotalByUserCategoryRequest = async (idUsuario, idCategoria) => {
  return await claraApi.get(`/budget/user/${idUsuario}/category/${idCategoria}`);
};

export const createBudgetByCategory = async (presupuesto) => {
  return await claraApi.post(`/operaciones/crear/ingreso`, presupuesto);
};