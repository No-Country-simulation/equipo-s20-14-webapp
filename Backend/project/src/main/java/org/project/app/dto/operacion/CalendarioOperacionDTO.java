package org.project.app.dto.operacion;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CalendarioOperacionDTO {
    private Long id;
    private String descripcion;
    private LocalDate fechaProgramada;
    private double monto;
    private Boolean esFijo;
    private Integer cicloDias;
    private String tipo;  // Usamos String para la representación textual del enum
    private String estado; // Usamos String para la representación textual del enum
    private Long categoriaId;
    private Long usuarioId;
}

