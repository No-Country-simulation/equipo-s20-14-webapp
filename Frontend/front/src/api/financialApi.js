import axios from '../libs/axios'

// Función para obtener los gastos
export const getGastosRequest = async () => {
  try {
    const response = await axios.get('/api/gastos'); // Ajusta la ruta según tu backend
    return response.data;
  } catch (error) {
    console.error('Error obteniendo los gastos:', error);
    throw error;
  }
}

// Función para obtener los ingresos
export const getIngresosRequest = async () => {
  try {
    const response = await axios.get('/api/ingresos'); // Ajusta la ruta según tu backend
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
