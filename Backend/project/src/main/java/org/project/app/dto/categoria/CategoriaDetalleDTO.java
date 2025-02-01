package org.project.app.dto.categoria;

import lombok.Data;

@Data
public class CategoriaDetalleDTO {
private String nombre;
    private double presupuesto;
    private double gasto;
    private double disponible;

    public CategoriaDetalleDTO(String nombre, double presupuesto,
                               double gasto, double disponible) {
        this.nombre = nombre;
        this.presupuesto = presupuesto;
        this.gasto = gasto;
        this.disponible = disponible;
    }

    public CategoriaDetalleDTO() {

    }
}

