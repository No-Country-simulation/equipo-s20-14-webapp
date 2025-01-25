package org.project.app.model;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Getter
@Setter
public class Operacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descripcion;
    private LocalDate fecha;
    private double monto;
    @Enumerated(EnumType.STRING)
    private TipoOperacion tipo;
    private Boolean EsFijo;
    private Integer cicloDias;
    @Enumerated(EnumType.STRING)
    private Estado estado;
    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private User usuario;
    public enum TipoOperacion {
        INGRESO,
        GASTO
    }
    public enum Estado {
        EFECTUADA,
        EN_PROCESO,
        VENCIDA
    }
}


