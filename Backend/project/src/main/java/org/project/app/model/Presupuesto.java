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
public class Presupuesto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate fechaInicio;
    private int duracion; // duración en días
    private double monto;
    private LocalDate fechaCreacion;
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private User usuario;
    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = true)
    private Categoria categoria;
}

