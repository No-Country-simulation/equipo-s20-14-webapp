import { Card, CardContent } from "../../../components/ui/card";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useEffect, useState,} from "react";
import { getGastosRequest, getIngresosRequest } from "../../../api/financialApi";
import { useAuthStore } from "../../../store/auth"

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const ReporteGeneral = () => {
  const profile = useAuthStore((state) => state.profile);
  console.log(useAuthStore);
  
  const [gastos, setGastos] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
          const fetchGastos = async () => {
              try {
                  if (profile?.id && profile?.token) {
                      const data= await getGastosRequest(profile.id);
                      console.log("Gastos cargados:", data);
                      setGastos(data);
                  };
          
              } catch (error) {
              console.log("Error al cargar los gastos: ", error);
              } finally { 
                  setLoading(false);
              }
          }
          fetchGastos();

          // Función para obtener los ingresos
          const fetchIngresos = async() => {
            try {
              if (profile?.id && profile?.token) {
                const data= await getIngresosRequest(profile.id);
                console.log("Ingresos cargados:", data);
                setIngresos(data);
              };
            }catch (error) {
              console.log("Error al cargar los ingresos: ", error);
              } finally { 
                  setLoading(false);
              }
          }
          fetchIngresos();
      },[profile?.id]);  
      
  
      if (loading) {
          return <p className="text-center text-gray-500 mt-4">Cargando reporte...</p>;
      }
  
      if (ingresos.length === 0) {
          return <p className="text-center text-gray-500 mt-4">No hay ingresos registrados.</p>;
      }
      

  
      // Calcular totalIngresos
    const totalIngresos = ingresos;

    // Calcular totalGastos
    const totalGastos = gastos;

    // Calcular el balance final (ingresos - gastos)
    const totalBalance = totalIngresos - totalGastos;



  // Datos para el gráfico de barras (ingresos y gastos mensuales)
  const barData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "Ingresos",
        data: [totalIngresos, 0, 0, 0, 0],
        backgroundColor: "#4ade80",
      },
      {
        label: "Gastos",
        data: [totalGastos, 0, 0, 0 ,0],
        backgroundColor: "#f87171",
      },
    ],
  };
  const barOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `$${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
  };
  

  
  return (
    <div className="flex min-h-screen">
  
      <div className=" p-6 space-y-8 bg-white rounded-lg shadow-md flex-grow">
        <h2 className="text-xl font-semibold mb-4">Reporte General Semestral</h2>

        {/* Resumen Financiero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto max-h-[500px]  w-3/4 ">
          <Card className="bg-green-100">
            <CardContent>
              <h3 className="text-lg font-semibold">Ingresos Totales</h3>
              <p className="text-2xl font-bold">${totalIngresos}</p>
            </CardContent>
          </Card>
          

          <Card className="bg-red-100">
            <CardContent>
              <h3 className="text-lg font-semibold">Gastos Totales</h3>
              <p className="text-2xl font-bold">${totalGastos}</p>
            </CardContent>
          </Card>
          
          {/*Saldo*/}
          <Card className="bg-blue-100">
            <CardContent>
              <h3 className="text-lg font-semibold">Saldo</h3>
              <p className="text-2xl font-bold">
                ${totalBalance}
              </p>
            </CardContent>
          </Card>
        </div>


        {/* Gráfico de Barras */}
        <div className="bg-white p-6 rounded-2xl shadow-md w-3/4 mx-auto">
          <h3 className="text-lg font-semibold mb-4">
            Ingresos vs Gastos Mensuales
          </h3>
          <Bar data={barData} options={barOptions}/>
        </div>

        {/* Últimas Operaciones */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Últimas Operaciones</h3>
          <ul className="space-y-2">
            <li className="flex justify-between border-b pb-2">
              <span className="font-medium">Compra en supermercado</span>
              <span className="text-red-500">- $100</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span className="font-medium">Pago de sueldo</span>
              <span className="text-green-500">+ $500</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span className="font-medium">Carga de combustible</span>
              <span className="text-red-500">- $50</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default ReporteGeneral;
