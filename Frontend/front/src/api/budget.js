import claraApi from "../libs/claraApi";

export const budgetTotalByUserCategoryRequest = async (idUsuario, idCategoria) => {
  return await claraApi.get(`/presupuestos/total/${idUsuario}/${idCategoria}`);
};