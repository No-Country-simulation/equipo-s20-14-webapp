package org.project.app.dto.category;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

public record RequestCategoryDto(
        @Schema(description = "Nombre de la categoría", example = "Comida")
        @NotBlank(message = "El nombre de la categoría no puede estar en blanco")
        @Size(min = 1, max = 100, message = "El nombre de la categoría debe tener entre 1 y 100 caracteres")
        String name
) implements Serializable {
}
