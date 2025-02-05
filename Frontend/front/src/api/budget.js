import claraApi from "../libs/claraApi";

export const budgetTotalByUserCategoryRequest = async (idUsuario, idCategoria) => {

  try {
    const response = await claraApi.get(`/budget/user/${idUsuario}/category/${idCategoria}`);
    return response.data;
  } catch (error) {    
    if (error.status === 404) {   
      return 0
    }
  }
};

export const createBudgetByCategory = async (presupuesto) => {
  return await claraApi.post("/budget/create", presupuesto);
};

export const updateBudgetByCategory = async (presupuesto) => {
  return await claraApi.post("/budget/update", presupuesto);
};