import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getGastos } from "../../../actions/reportesAction";
import { getIngresoList, getIngresosTotal } from "../../../api/financialApi";
import { Card, CardContent } from "../../../components/ui/card";
import { useAuthStore } from "../../../store/auth";

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
  const [gastos, setGastos] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [ingresosList, setIngresosList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        if (profile?.id && profile?.token) {
          const data = await getGastos(profile.id);
          setGastos(data.data);
        }
      } catch (error) {
        console.log("Error al cargar los gastos: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGastos();

    const fetchIngresos = async () => {
      try {
        if (profile?.id && profile?.token) {
          const data = await getIngresosTotal(profile.id);
          setIngresos(data);
        }
      } catch (error) {
        console.log("Error al cargar los ingresos: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIngresos();

    const fetchIngresosList = async () => {
      try {
        if (profile?.id && profile?.token) {
          const data = await getIngresoList(profile.id);
          setIngresosList(data);
        }
      } catch (error) {
        console.log("Error al cargar los ingresos: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIngresosList();
  }, [profile?.id]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-center text-gray-500 mt-4">Cargando reporte...</p>
      </div>
    );
  }

  if (ingresos?.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No hay ingresos registrados.
      </p>
    );
  }

  const totalIngresos = ingresos;
  const totalGastos = gastos.reduce((total, gasto) => total + gasto.amount, 0);
  const totalBalance = totalIngresos - totalGastos;

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
        data: [totalGastos, 0, 0, 0, 0],
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

  const ultimosGastos = [...gastos].reverse();

  return (
    <div className="w-full flex justify-between">
      <div className="w-7/12 p-6 space-y-8 bg-white rounded-lg shadow-md flex-grow">
        <h2 className="text-xl font-semibold mb-4">
          Reporte General Semestral
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <Card className="bg-blue-100">
            <CardContent>
              <h3 className="text-lg font-semibold">Saldo</h3>
              <p className="text-2xl font-bold">${totalBalance}</p>
            </CardContent>
          </Card>
        </div>

        <div className="w-full bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            Ingresos vs Gastos Mensuales
          </h3>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      <div className="w-5/12 bg-white p-6 rounded-2xl shadow-md flex flex-col gap-10">
        <div>
          <h3 className="text-lg font-semibold mb-4">Ultimos ingresos</h3>
          <ul className="space-y-2">
            {/* Últimos Ingresos */}
            {ingresosList.slice(0, 4).map((ingreso) => {
              const fecha = new Date(
                ingreso.fechaEfectuada || ingreso.fechaProgramada
              ).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              });

              return (
                <li
                  key={ingreso.operacionId}
                  className="flex justify-between border-b pb-2"
                >
                  <div>
                    <span className="font-medium">{ingreso.descripcion}</span>
                    <p className="text-gray-500 text-sm">{fecha}</p>
                  </div>
                  <span className="text-green-500">+ ${ingreso.monto}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Ultimos gastos</h3>
          <ul className="space-y-2">
            {ultimosGastos.slice(0, 4).map((gasto) => {
              const fecha = new Date(gasto.dateCreation).toLocaleDateString(
                "es-ES",
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }
              );

              const hora = new Date(gasto.dateCreation).toLocaleTimeString(
                "es-ES",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }
              );

              return (
                <li
                  key={gasto.id}
                  className="flex justify-between border-b pb-2"
                >
                  <div>
                    <span className="font-medium">{gasto.description}</span>
                    <p className="text-gray-500 text-sm">
                      {fecha} {hora}
                    </p>
                  </div>
                  <span className={`text-red-500`}>
                    {gasto.isSpent ? "- " : "+ "}${gasto.amount}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReporteGeneral;
