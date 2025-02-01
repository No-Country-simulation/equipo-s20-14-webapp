package org.project.app.dto.operacion.ingreso;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DetalleIngresoFijoDTO {
    private Long operacionId;
    private String estado;
    private double monto;
    private String descripcion;
    private LocalDate fechaProgramada;
    private int cicloDias;

    public DetalleIngresoFijoDTO() {
    }

    public DetalleIngresoFijoDTO(Long operacionId, String estado, double monto, String descripcion,
                                 LocalDate fechaProgramada, int cicloDias) {
        this.operacionId = operacionId;
        this.estado = estado;
        this.monto = monto;
        this.descripcion = descripcion;
        this.fechaProgramada = fechaProgramada;
        this.cicloDias = cicloDias;
    }
}

