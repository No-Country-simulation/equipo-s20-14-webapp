import { useState } from "react"
import { TextField, Button, Container, Typography, Paper, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
/*import claraApi from "../../libs/claraApi";*/

export const VistaServicios = () =>{

    //Definimos el estado para los campos del formulario
    const [descripcion, setDescripcion] = useState("");
    const [fecha, setFecha] = useState("");
    const [monto, setMonto] = useState("");
    const [servicios, setServicios] = useState([]);//Lista de servicios
    const [editIndex, setEditIndex] = useState(null);// Para saber si estamos editando

    //funcio para manejar el envio del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); //Evita que la página se recargue

        if (!descripcion || !fecha || !monto) {
            alert("Todos los campos son obligatorios");//Validación simple
            return;
        }

        //Creamos un nuevo servicio con los datos ingresados
        const nuevoServicio = { descripcion, fecha, monto: parseFloat(monto) || 0 };

        if (editIndex !== null){
            // Si estamos editando, actualizamos en lugar de agregar
            const serviciosActualizados = [...servicios];
            serviciosActualizados[editIndex] = nuevoServicio;
            setServicios(serviciosActualizados);
            setEditIndex(null);//resetear modo edición
        }else {
             //Actualizamos la lista de servicios con el nuevo
            setServicios([...servicios, nuevoServicio]);
        }

        //Limpiamos los campos después de agregar el servicio
        setDescripcion("");
        setFecha("");
        setMonto("");
    };

        // Eliminar servicio
    const handleDelete = (index) => {
        const nuevaLista = servicios.filter((_, i) => i !== index);
        setServicios(nuevaLista);
    };

    // Cargar los datos en el formulario para editar
    const handleEdit = (index) => {
        const servicio = servicios[index];
        setDescripcion(servicio.descripcion);
        setFecha(servicio.fecha);
        setMonto(servicio.monto);
        setEditIndex(index);
    };

    /*const fetchServicios = async () => {
        try {
            const { data } = await claraApi.get('/servicios')
            console.log(data)
        } catch (error) {
            console.log('Error al obtener servicios', error)
        }
    }*/  


    return(
        <Container maxWidth="sm">

            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>

                <Typography variant="h5" gutterBottom>
                    Registrar Servicio
                </Typography>


            <form onSubmit={handleSubmit}>
                <TextField
                fullWidth
                label="Descripción"
                variant="outlined"
                margin="normal"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
            />
            <TextField
                fullWidth
                label="Fecha de Pago"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                margin="normal"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
            />
            <TextField
                fullWidth
                label="Monto"
                type="number"
                variant="outlined"
                margin="normal"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
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
        {servicios.map((servicio, index) => (
          <ListItem key={index} secondaryAction={
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
              primary={`${servicio.descripcion}`}
              secondary={`Fecha: ${servicio.fecha} | Monto: $${servicio.monto.toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
      {servicios.length ===  0 && (
        <Typography variant="body2" color="textSecondary">
        No hay servicios registrados aún.
        </Typography>
      )}
      
    </Container>
    );
};

