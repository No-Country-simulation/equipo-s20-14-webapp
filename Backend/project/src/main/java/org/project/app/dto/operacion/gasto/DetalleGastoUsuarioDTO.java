package org.project.app.dto.operacion.gasto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DetalleGastoUsuarioDTO {
    private Long operacionId;
    private Boolean esFijo;
    private Integer cicloDias;
    private double monto;
    private String descripcion;
    private LocalDate fechaEfectuada;
    private String estado;
    private LocalDate fechaProgramada;
    private Long categoriaId;
    public DetalleGastoUsuarioDTO() {
    }

    public DetalleGastoUsuarioDTO(Long operacionId, Boolean esFijo, Integer cicloDias,
                                  double monto, String descripcion, LocalDate fechaEfectuada,
                                  String estado, LocalDate fechaProgramada, Long categoriaId) {
        this.operacionId = operacionId;
        this.esFijo = esFijo;
        this.cicloDias = cicloDias;
        this.monto = monto;
        this.descripcion = descripcion;
        this.fechaEfectuada = fechaEfectuada;
        this.estado = estado;
        this.fechaProgramada = fechaProgramada;
        this.categoriaId = categoriaId;
    }
}

