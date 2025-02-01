package org.project.app.dto.presupuesto;

import lombok.Data;
//import java.time.LocalDate;

@Data
public class CrearPresupuestoDTO {
    /*private LocalDate fechaInicio;
    private int duracion; // duración en días*/
    private double monto;
    private Long categoriaId; // Cambiado a Long
    private Long usuarioId; // Cambiado a Long
}

