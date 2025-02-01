// src/services/ingresosService.js

import axios from '../libs/axios';  // Asegúrate de que axios esté configurado

export const getIngresosRequest = async (usuarioId) => {
  try {
    const response = await axios.get(`/operaciones/total/ingresos/${usuarioId}`);
    return response.data;  // Suponiendo que la respuesta sea un array de ingresos
  } catch (error) {
    console.error("Error al obtener los ingresos:", error);
    throw error;
  }
};
