import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
import axios from "axios";
import { useState } from "react";

const VistaHogar = () => {
  //Definimos el estado para los campos del formulario
  const [formulario, setFormulario] = useState({
    descripcion: "",
    fecha: "",
    monto: "",
  });
  const [hogar, setHogar] = useState([]); //Lista de servicios
  const [editIndex, setEditIndex] = useState(null); // Para saber si estamos editando

  //funcio para manejar el envio del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  //Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault(); //Evita que la página se recargue

    const { descripcion, fecha, monto } = formulario;
    if (!descripcion || !fecha || !monto) {
      alert("Todos los campos son obligatorios");
      return;
    }

    //Creamos un nuevo servicio con los datos ingresados
    const nuevoGasto = { descripcion, fecha, monto: parseFloat(monto) || 0 };
    if (nuevoGasto.monto <= 0) {
      alert("El monto debe ser mayor a 0");
      return;
    }

    if (editIndex !== null) {
      // Si estamos editando, actualizamos en lugar de agregar
      const serviciosActualizados = [...hogar];
      serviciosActualizados[editIndex] = nuevoGasto;
      setHogar(serviciosActualizados);
      setEditIndex(null); //resetear modo edición
    } else {
      //Actualizamos la lista de gastos con el nuevo
      setHogar([...hogar, nuevoGasto]);
    }

    //Limpiamos los campos después de agregar el servicio
    setFormulario({ descripcion: "", fecha: "", monto: "" });
  };

  // Eliminar servicio
  const handleDelete = (index) => {
    setHogar(hogar.filter((_, i) => i !== index));
  };

  // Cargar los datos en el formulario para editar
  const handleEdit = (index) => {
    setFormulario(hogar[index]);
    setEditIndex(index);
  };

  // Función para guardar la lista de servicios en el backend
  const guardarTransporte = async () => {
    try {
      const response = await axios.post(
        "/operaciones/confirmar/{operacionId}",
        hogar
      );
      console.log("Gastos guardados correctamente:", response.data);
      alert("Gastos guardados correctamente");
    } catch (error) {
      console.error("Error al guardar los gastos", error);
      alert("Hubo un error al guardar los gastos");
    }
  };
  /*const fetchServicios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/servicios');
        console.log("Respuesta de la API:", response.data);  // Verifica el contenido aquí
        setServicios(response.data);
      } catch (error) {
        console.error('Error al obtener los servicios', error);
      }
    };*/

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" gutterBottom>
          {editIndex !== null ? "Editar Gasto" : "Registrar Gasto del Hogar"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            variant="outlined"
            margin="normal"
            value={formulario.descripcion}
            onChange={handleChange}
            required
          />
          <TextField
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
          />
          <TextField
            fullWidth
            label="Monto"
            name="monto"
            type="number"
            variant="outlined"
            margin="normal"
            value={formulario.monto}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {editIndex !== null ? "Actualizar Gasto" : "Agregar Gasto"}
          </Button>
        </form>
      </Paper>

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Servicios Registrados
      </Typography>
      <List>
        {hogar.map((hogar, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={() => handleEdit(index)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={`${hogar.descripcion}`}
              secondary={`Fecha: ${hogar.fecha} | Monto: $${hogar.monto.toFixed(
                2
              )}`}
            />
          </ListItem>
        ))}
      </List>
      {/* Botón de guardar servicios */}
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={guardarTransporte}
        style={{ marginTop: "20px" }}
        disabled={hogar.length === 0}
      >
        Guardar gastos
      </Button>
      {hogar.length === 0 && (
        <Typography variant="body2" color="textSecondary">
          No hay servicios registrados aún.
        </Typography>
      )}
    </Container>
  );
};

export default VistaHogar;
