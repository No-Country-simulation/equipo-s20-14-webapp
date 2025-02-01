package org.project.app.dto.presupuesto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PresupuestoDTO {
    private Long id;
    private double monto;
    private Long categoriaId; // Cambiado a Long
    private Long usuarioId; // Cambiado a Long

    public PresupuestoDTO() {
    }

    public PresupuestoDTO(Long id, double monto, Long categoriaId, Long usuarioId) {
        this.id = id;
        this.monto = monto;
        this.categoriaId = categoriaId;
        this.usuarioId = usuarioId;
    }
}

