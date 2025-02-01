package org.project.app.dto.transaction;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

import java.io.Serializable;

public record RequestTransactionDto(
        @Schema(description = "Cantidad de dinero", example = "1000.0")
        @NotNull(message = "La cantidad de dinero no puede ser nula.")
        @Positive(message = "La cantidad de dinero debe ser un valor positivo.")
        Double amount,

        @Schema(description = "Descripción de la operación", example = "Hoy compré un pan")
        @NotNull(message = "La descripción de la operación no puede ser nula.")
        @Size(min = 1, max = 200, message = "La descripción de la operación debe tener entre 1 y 100 caracteres.")
        String description,

        @Schema(description = "True si es gasto, false si es ingreso", example = "true")
        @NotNull(message = "El campo 'isSpent' no puede ser nulo.")
        Boolean isSpent,

        @Schema(description = "True si es fijo, false si no es fijo", example = "true")
        @NotNull(message = "El campo 'isFixed' no puede ser nulo.")
        Boolean isFixed,

        @Schema(description = "Cantidad de días", example = "30")
        @NotNull(message = "La cantidad de días no puede ser nula.")
        @Min(value = 1, message = "La cantidad de días debe ser como mínimo 1.")
        @Max(value = 31, message = "La cantidad de días no puede ser mayor a 31.")
        Integer cycleDays,

        @Schema(description = "ID de la categoría", example = "1")
        @NotNull(message = "El ID de la categoría no puede ser nulo.")
        Long categoryId,

        @Schema(description = "ID del usuario", example = "1")
        @NotNull(message = "El ID del usuario no puede ser nulo.")
        Long userId
) implements Serializable {
}
