package org.project.app.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PresupuestoDTO {
    private Long id;
    private LocalDate fechaInicio;
    private int duracion; // duración en días
    private double monto;
    private String categoriaNombre;
    private Long usuarioId;
}

