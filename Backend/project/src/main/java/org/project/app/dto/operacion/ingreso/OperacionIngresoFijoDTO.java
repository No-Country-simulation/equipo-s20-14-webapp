package org.project.app.dto.operacion.ingreso;

import lombok.Data;

import java.time.LocalDate;

@Data
public class OperacionIngresoFijoDTO {
    private String descripcion;
    private LocalDate fechaProgramada;
    private Integer cicloDias;
    private double monto;
    private Long usuarioId;
}

