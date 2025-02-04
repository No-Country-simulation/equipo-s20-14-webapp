package org.project.app.dto.budget;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.io.Serializable;

public record UpdateBudget(
        @Schema(description = "Id del Presupuesto", example = "5")
        @NotNull(message = "EL id del Presupuesto no puede estar vacio")
        Long idPresupuesto,
        @Schema(description = "Monto del Presupuesto", example = "20000")
        @NotNull(message = "La cantidad de presupuesto no puede ser nula.")
        @Positive(message = "El Monto debe ser un valor positivo.")
        Double budgetamount
) implements Serializable {
}