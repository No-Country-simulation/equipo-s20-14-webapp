package org.project.app.dto.operacion;

import lombok.Data;
import java.time.LocalDate;

@Data
public class OperacionFijaDTO {
    private String descripcion;
    private LocalDate fechaProgramada;
    private Integer cicloDias;
    private double monto;
    private Long categoriaId;
    private Long usuarioId;
}

