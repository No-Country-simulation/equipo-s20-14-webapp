package org.project.app.dto.categoria;

import lombok.Data;

@Data
public class CategoriaDetalleDTO {
    private Long id;
    private String nombre;
    private double presupuesto;
    private double gasto;
    private double disponible = presupuesto - gasto;

    public CategoriaDetalleDTO(String nombre, double presupuesto, double gasto) {
        this.nombre = nombre;
        this.presupuesto = presupuesto;
        this.gasto = gasto;
    }

    public CategoriaDetalleDTO() {

    }
}

