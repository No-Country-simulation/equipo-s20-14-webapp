package org.project.app.dto.operacion.gasto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.project.app.model.Operacion;

import java.time.LocalDate;

@Data
public class DetalleGastoFijoDTO {
    private Long operacionId;
    private String estado;
    private double monto;
    private String descripcion;
    private LocalDate fechaProgramada;
    private int cicloDias;
    private Long categoriaId;
    public DetalleGastoFijoDTO() {
    }
    public DetalleGastoFijoDTO(Long operacionId, String estado, double monto, String descripcion,
                               LocalDate fechaProgramada, int cicloDias, Long categoriaId) {
        this.operacionId = operacionId;
        this.estado = estado;
        this.monto = monto;
        this.descripcion = descripcion;
        this.fechaProgramada = fechaProgramada;
        this.cicloDias = cicloDias;
        this.categoriaId = categoriaId;
    }
}

