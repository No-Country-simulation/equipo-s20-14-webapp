import claraApi from "../libs/claraApi";

export const categoryRequest = async (idUsuario) => {
  return await claraApi.get(`/categorias/lista/${idUsuario}`);
};
