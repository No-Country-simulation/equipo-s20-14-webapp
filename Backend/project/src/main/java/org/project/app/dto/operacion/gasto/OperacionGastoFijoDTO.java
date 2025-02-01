package org.project.app.dto.operacion.gasto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class OperacionGastoFijoDTO {
    private String descripcion;
    private LocalDate fechaProgramada;
    private Integer cicloDias;
    private double monto;
    private Long categoriaId;
    private Long usuarioId;
}

