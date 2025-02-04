import { useState } from "react"
import { TextField, Button, Container, Typography, Paper, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";


const VistaGastos = (categoriaId) =>{  
  
  //Definimos el estado para los campos del formulario
  const [formulario, setFormulario] = useState({ descripcion: "", fecha: "", monto: "" });
  const [gastos, setGastos] = useState([]);//Lista de servicios
  const [editIndex, setEditIndex] = useState(null);// Para saber si estamos editando

  
  //funcio para manejar el envio del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({...prev, [name]: value }));
        
  } ;

  //Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); //Evita que la página se recargue

    const { descripcion, fecha, monto }= formulario;
      if (!descripcion || !fecha || !monto) {
      alert("Todos los campos son obligatorios");
      return;
      };
    
      //Creamos un nuevo servicio con los datos ingresados
    const nuevoGasto = { descripcion, fecha, monto: Number(monto) || 0 };
    if (nuevoGasto.monto <= 0) {
      alert("El monto debe ser mayor a 0");
      return;
    };

    try {
      const response = await axios.post("/operaciones/crear/gastos", nuevoGasto);
      const gastoGuardado = response.data;

      if (editIndex !== null){
      // Si estamos editando, actualizamos en lugar de agregar
        const gastosActualizados = [...gastos];
        gastosActualizados[editIndex] = gastoGuardado;
        setGastos(gastosActualizados);
        setEditIndex(null);//resetear modo edición
      }else {
        //Actualizamos la lista de servicios con el nuevo
          setGastos([...gastos, gastoGuardado]);
      };
    
      //Limpiamos los campos después de agregar el servicio
      setFormulario({ descripcion:"", fecha:"", monto:""});
      alert("Gasto guardado exitosamente");
        
    } catch (error) {
      console.error("Error al guardar gasto", error);
      alert("Hubo un error al guardar el gasto")
    };
  }; 
      
    // Eliminar servicio
    const handleDelete = (index) => {
      setGastos(gastos.filter((_, i) => i !== index));
        
    };
    /*const handleDelete = async (index) => {
      const gastoAEliminar = gastos[index];
    
      try {
        await axios.delete(`/operaciones/eliminar/gastos/${gastoAEliminar.id}`);
        setGastos(gastos.filter((_, i) => i !== index));
        alert("Gasto eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar gasto", error);
        alert("Hubo un error al eliminar el gasto");
      }
    };*/

    // Cargar los datos en el formulario para editar
    const handleEdit = (index) => {
      setFormulario(gastos[index]);
      setEditIndex(index);
    };

    // Función para guardar la lista de servicios en el backend
  const guardarGastos = async () => {
    try {
      const response = await axios.post("http://localhost:5000/operaciones", gastos, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Servicios guardados correctamente:", response.data);
      alert("Servicios guardados correctamente");
    } catch (error) {
      console.error("Error al guardar los gastos", error);
      alert("Hubo un error al guardar los gastos");
    }
  };
  

    return(

      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>

          <Typography variant="h5" gutterBottom>
            {editIndex !== null ? <span className="capitalize">{`Editar ${categoriaId}`}</span> : <span className="capitalize">{`Registrar ${categoriaId}`}</span>}
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
            
            {editIndex !== null ? "Actualizar Servicios" : "Agregar Servicio"}
          </Button>
        </form>
      </Paper>

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Servicios Registrados
      </Typography>
      <List>
        {gastos.map((gasto, index) => (
          <ListItem key={index} 
          secondaryAction={
          <>
            <IconButton edge="end" color="primary" onClick={() => handleEdit(index)}>
              <EditIcon />
            </IconButton>    
            <IconButton edge="end" color="error" onClick={() => handleDelete(index)}>
              <DeleteIcon />
            </IconButton>
          </>
          }
          >
            <ListItemText
              primary={`${gasto.descripcion}`}
              secondary={`Fecha: ${gasto.fecha} | Monto: $${gasto.monto.toFixed(2)}`}
            />
          </ListItem>

          
        ))}
      </List>
      {/* Botón de guardar servicios */}
      <Button 
        variant="contained" 
        color="secondary" 
        fullWidth 
        onClick={guardarGastos}
        style={{ marginTop: "20px" }}
        disabled={gastos.length === 0}
      >
        Guardar Servicios
      </Button>
      {gastos.length ===  0 && (
        <Typography variant="body2" color="textSecondary">
        No hay servicios registrados aún.
        </Typography>
      )}
      
    </Container>
  );
};  

export default VistaGastos;
