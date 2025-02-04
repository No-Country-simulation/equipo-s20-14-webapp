import axios from '../libs/axios'
import { getEnvVariables } from '../helpers/getEnvVariables';
import { useAuthStore } from '../store/auth';


console.log("VITE_API_URL:", getEnvVariables());

// Función para obtener los gastos
export const getGastosRequest = async (usuarioId) => {
  try {
    const response = await axios.get(`/operaciones/total/gastos/${usuarioId}`); // Ajusta la ruta según tu backend
    return response.data;
  } catch (error) {
    console.error('Error obteniendo los gastos:', error);
    throw error;
  }
}

// Función para obtener los ingresos
export const getIngresosRequest = async (usuarioId) => {
  try {
    const response = await axios.get(`'https://equipo-s20-14-webapp.onrender.com/operaciones/total/ingresos/${usuarioId}`); // Ajusta la ruta según tu backend
    return response.data;
  } catch (error) {
    console.error('Error obteniendo los ingresos:', error);
    throw error;
  }
}

// Función para agregar un gasto
export const addGastoRequest = async (gastoData) => {
  try {
    const response = await axios.post(`/operaciones/crear/gasto`, gastoData);
    return response.data;
  } catch (error) {
    console.error('Error agregando el gasto:', error);
    throw error;
  }
}

// Función para agregar un ingreso
export const addIngresoRequest = async (ingresoData) => {
  try {
    const response = await axios.post(`/operaciones/crear/ingreso`, ingresoData);
    return response.data;
  } catch (error) {
    console.error('Error agregando el ingreso:', error);
    throw error;
  }
}

//Función para obtener total del presupuesto
export const getPresupuestoTotalRequest = async (userId, categoriaId) => {
  try {
     // Obtener los presupuestos de todas las categorías
    const responses = await Promise.all(
      categoriaId.map(async (categoryId) => {
        const response = await axios.get(`//budget/user/${userId}/category/${categoryId}`);
        return response.data; // Suponiendo que el backend devuelve el total directamente
      })
    );
    //sumar todos los presupuestos 
    const totalPresupuesto = responses.reduce((acc, curr) => acc + curr, 0);
    return totalPresupuesto;

  } catch (error) {
    console.error("Error obteniendo el presupuesto total:", error);
    throw error;
  }
};

//Funcion para  enviar datos al backend
export const addBudget = async (idUsuario, idCategoria, monto) => {
  try {

     
    // Obtener el token de autenticación
    const token = useAuthStore.getState().token; 

    if (!token) {
      throw new Error("No hay token de autenticación disponible");
    }

    const response = await fetch("/budget/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`,
      },
      body: JSON.stringify({
        idUsuario,
        idCategoria,
        monto: parseFloat(monto), // Convertimos a número
      }),
    });

    if (!response.ok) {
      throw new Error("Error al agregar presupuesto");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en addBudget:", error);
    return null;
  }
};
