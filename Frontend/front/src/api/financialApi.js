import axios from '../libs/axios'

// Función para obtener los gastos
export const getGastosRequest = async () => {
  try {
    const response = await axios.get('/operaciones/total/gastos/{usuarioId}'); // Ajusta la ruta según tu backend
    return response.data;
  } catch (error) {
    console.error('Error obteniendo los gastos:', error);
    throw error;
  }
}

// Función para obtener los ingresos
export const getIngresosRequest = async () => {
  try {
    const response = await axios.get('/operaciones/total/ingresos/{usuarioId}'); // Ajusta la ruta según tu backend
    return response.data;
  } catch (error) {
    console.error('Error obteniendo los ingresos:', error);
    throw error;
  }
}

// Función para agregar un gasto
export const addGastoRequest = async (gastoData) => {
  try {
    const response = await axios.post('/api/gastos', gastoData);
    return response.data;
  } catch (error) {
    console.error('Error agregando el gasto:', error);
    throw error;
  }
}

// Función para agregar un ingreso
export const addIngresoRequest = async (ingresoData) => {
  try {
    const response = await axios.post('/api/ingresos', ingresoData);
    return response.data;
  } catch (error) {
    console.error('Error agregando el ingreso:', error);
    throw error;
  }
}


export const getPresupuestoTotalRequest = async (usuarioId, categoriaId) => {
  try {
    const response = await axios.get(`/presupuestos/total/${usuarioId}/${categoriaId}`);
    return response.data; // Suponiendo que el backend devuelve el total directamente
  } catch (error) {
    console.error("Error obteniendo el presupuesto total:", error);
    throw error;
  }
};
