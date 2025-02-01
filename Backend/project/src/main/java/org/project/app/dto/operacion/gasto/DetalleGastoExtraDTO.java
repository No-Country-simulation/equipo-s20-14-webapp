package org.project.app.dto.operacion.gasto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
public class DetalleGastoExtraDTO {
    private Long operacionId;
    private LocalDate fechaEfectuada;
    private double monto;
    private String descripcion;
    private String estado;
    private Long categoriaId;

    public DetalleGastoExtraDTO() {
    }
    public DetalleGastoExtraDTO(Long operacionId, LocalDate fechaEfectuada, double monto,
                                String descripcion, String estado, Long categoriaId) {
        this.operacionId = operacionId;
        this.fechaEfectuada = fechaEfectuada;
        this.monto = monto;
        this.descripcion = descripcion;
        this.estado = estado;
        this.categoriaId = categoriaId;
    }
}

