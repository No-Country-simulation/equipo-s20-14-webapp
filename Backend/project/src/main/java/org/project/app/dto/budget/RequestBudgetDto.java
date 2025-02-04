package org.project.app.dto.budget;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.io.Serializable;

public record RequestBudgetDto(
        @Schema(description = "Monto del Presupuesto", example = "10000")
        @NotNull(message = "La cantidad de presupuesto no puede ser nula.")
        @Positive(message = "El Monto debe ser un valor positivo.")
        Double budgetamount,
        @Schema(description = "Id de la Categoria", example = "3")
        @NotNull(message = "El ID de la categoria no puede ser nulo.")
        Long idCategory,
        @Schema(description = "Id del Usuario", example = "1")
        @NotNull(message = "El ID del usuario no puede ser nulo.")
        Long idUser
) implements Serializable {
}
