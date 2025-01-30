package org.project.app.dto.operacion;

import lombok.Data;

import java.time.LocalDate;

@Data
public class OperacionIngresoExtraDTO {
    private String descripcion;
    private LocalDate fechaEfectuada;
    private double monto;
    private Long usuarioId;
}

