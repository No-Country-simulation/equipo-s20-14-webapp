// src/services/ingresosService.js

import axios from '../libs/axios';  // Asegúrate de que axios esté configurado

export const getGastosRequest = async (usuarioId) => {
  try {
    const response = await axios.get(`/categorias/crear/${usuarioId}`);
    return response.data;  // Suponiendo que la respuesta sea un array de gastos
  } catch (error) {
    console.error("Error al obtener los gastos:", error);
    throw error;
  }
};
