package org.project.app.dto.operacion.ingreso;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DetalleIngresoExtraDTO {
    private Long operacionId;
    private LocalDate fechaEfectuada;
    private double monto;
    private String descripcion;
    private String estado;

    public DetalleIngresoExtraDTO() {
    }

    public DetalleIngresoExtraDTO(Long operacionId, LocalDate fechaEfectuada,
                                  double monto, String descripcion, String estado) {
        this.operacionId = operacionId;
        this.fechaEfectuada = fechaEfectuada;
        this.monto = monto;
        this.descripcion = descripcion;
        this.estado = estado;
    }
}

