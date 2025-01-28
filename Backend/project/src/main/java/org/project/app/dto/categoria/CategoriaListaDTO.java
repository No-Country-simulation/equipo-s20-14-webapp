package org.project.app.dto.categoria;

import lombok.Data;

@Data
public class CategoriaListaDTO {
    private Long id;
    private String nombre;
    public CategoriaListaDTO(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }
}

