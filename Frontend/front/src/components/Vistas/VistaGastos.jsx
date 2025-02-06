import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addExpense, getExpensesByUser } from "../../actions/expensesActions";
import { removeExpense } from "../../api/expenses";
import { useAuthStore } from "../../store/auth";
import { useBudgetStore } from "../../store/budget";

const VistaGastos = ({ categoria, idCategoria }) => {
  //Definimos el estado para los campos del formulario
  const profile = useAuthStore((state) => state.profile);
  const [formulario, setFormulario] = useState({
    description: "",
    fecha: "",
    amount: "",
  });
  const [servicios, setServicios] = useState([]); //Lista de servicios
  const [editIndex, setEditIndex] = useState(null); // Para saber si estamos editando
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gastosTotal, setGastosTotal] = useState(0);
  const presupuestoTotal = useBudgetStore((state) => state.presupuestoTotal);

  useEffect(() => {
    setShow(false);
    loadBudgets();
    setFormulario({
      description: "",
      fecha: "",
      amount: "",
    });
    setServicios([]);
    setLoading(true);
    loadExpenses();
  }, [categoria, presupuestoTotal]);

  const loadExpenses = async () => {
    const { data } = await getExpensesByUser(profile.id);
    const filtrados = data.filter(
      (expense) => expense.categoryId === parseInt(idCategoria)
    );
    const sumaMontos = filtrados.reduce(
      (total, item) => total + item.amount,
      0
    );
    setServicios(filtrados);
    setGastosTotal(sumaMontos);
    setLoading(false);
  };

  const loadBudgets = async () => {
    if (presupuestoTotal !== 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  //funcio para manejar el envio del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  //Enviar formulario
  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault(); //Evita que la página se recargue

    const actual = presupuestoTotal - gastosTotal;
    const { description, amount } = formulario;
    if (amount <= actual) {
      if (!description || !amount) {
        toast.error("Todos los campos son obligatorios");
        return;
      }

      if (amount <= 0) {
        toast.error("El monto debe ser mayor a 0");
        return;
      }
      //Creamos un nuevo servicio con los datos ingresados
      const nuevoServicio = {
        amount: parseFloat(amount) || 0,
        description,
        isSpent: true,
        isFixed: true,
        cycleDays: 30,
        categoryId: parseInt(idCategoria),
        userId: profile.id,
      };

      // const response = await axios.post("/operaciones/crar/gastos", nuevoServicio);
      const response = await addExpense(nuevoServicio);

      const gastoGuardado = response.data;

      if (editIndex !== null) {
        // Si estamos editando, actualizamos en lugar de agregar
        const serviciosActualizados = [...servicios];
        serviciosActualizados[editIndex] = gastoGuardado;
        setServicios(serviciosActualizados);
        setEditIndex(null); //resetear modo edición
      } else {
        //Actualizamos la lista de servicios con el nuevo
        setServicios([gastoGuardado, ...servicios]);
      }

      //Limpiamos los campos después de agregar el servicio
      setFormulario({ description: "", amount: "" });

      loadExpenses();
    } else {
      toast.error("No tiene suficiente presupuesto, total: " + actual);
      setFormulario({ description: "", amount: "" });
    }
    setIsSubmitting(false);
  };

  // Eliminar servicio
  const handleDelete = (index, id) => {
    removeExpense(id);
    setServicios(servicios.filter((_, i) => i !== index));
  };

  // Cargar los datos en el formulario para editar
  const handleEdit = (index, id) => {
    setFormulario(servicios[index]);
    setEditIndex(index);
  };

  return (
    show && (
      <Container maxWidth="sm">
        {!loading && (
          <h1 className="text-xl">
            Presupuesto actual: ${presupuestoTotal - gastosTotal}
          </h1>
        )}
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h5" gutterBottom>
            {editIndex !== null ? (
              <span className="capitalize">{`Editar ${categoria}`}</span>
            ) : (
              <span className="capitalize">{`Registrar ${categoria}`}</span>
            )}
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              variant="outlined"
              margin="normal"
              value={formulario.description}
              onChange={handleChange}
              required
            />
            {/* <TextField
              fullWidth
              label="Fecha de Pago"
              name="fecha"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              margin="normal"
              value={formulario.fecha}
              onChange={handleChange}
              required
            /> */}
            <TextField
              fullWidth
              label="Monto"
              name="amount"
              type="number"
              variant="outlined"
              margin="normal"
              value={formulario.amount}
              onChange={handleChange}
              required
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {editIndex !== null ? "Actualizar" : "Guardar"}
            </Button>
          </form>
        </Paper>

        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Gastos de <span className="capitalize">{categoria}</span> registrados,
          total: ${gastosTotal}
        </Typography>
        <List>
          {loading ? (
            <p className="text-gray-500 mt-4">Cargando gastos...</p>
          ) : servicios.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              No hay servicios registrados aún.
            </Typography>
          ) : (
            servicios.map((servicio, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <>
                    {/* <IconButton
                    edge="end"
                    color="primary"
                    onClick={() => handleEdit(index, servicio.id)}
                  >
                    <EditIcon />
                  </IconButton> */}
                    <IconButton
                      edge="end"
                      color="error"
                      onClick={() => handleDelete(index, servicio.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={`${servicio.description}`}
                  secondary={`Monto: $${servicio.amount.toFixed(2)}`}
                />
              </ListItem>
            ))
          )}
        </List>
      </Container>
    )
  );
};

export default VistaGastos;
