package org.project.app.dto.categoria;

import lombok.Data;

@Data
public class CategoriaDetalleDTO {
    private Long id;
    private String nombre;
    private double presupuesto;
    private double gasto;
    private double disponible = presupuesto - gasto;
    public CategoriaDetalleDTO(String nombre, double totalPresupuesto, double totalGasto) {
    }

    public CategoriaDetalleDTO() {

    }
}

