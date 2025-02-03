package org.project.app.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.project.app.dto.BaseResponse;
import org.project.app.dto.ExtendedBaseResponse;
import org.project.app.dto.budget.BudgetDto;
import org.project.app.dto.budget.RequestBudgetDto;
import org.project.app.dto.budget.UpdateBudget;
import org.project.app.service.BudgetService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Budget", description = "API para gestionar Presupuestos")
@RestController
@RequestMapping("/budget")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetService budgetService;

    @Operation(summary = "Crear un nuevo presupuesto", description = "Crea un nuevo presupuesto en la base de datos.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Presupuesto creado exitosamente.",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExtendedBaseResponse.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Datos inválidos en la solicitud.",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error al crear el presupuesto.",
                    content = @Content(mediaType = "application/json")
            )
    })
    @PostMapping(path = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExtendedBaseResponse<BudgetDto>> createBudget(@Valid @RequestBody RequestBudgetDto requestBudgetDto) {
        ExtendedBaseResponse<BudgetDto> response = budgetService.createBudget(requestBudgetDto);
        return ResponseEntity.status(201).body(response);
    }

    @Operation(summary = "Obtener un presupuesto por ID de usuario y ID de categoría", description = "Devuelve un presupuesto específico por el ID de usuario y el ID de categoría.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Presupuesto obtenido exitosamente.",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExtendedBaseResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Presupuesto no encontrado.",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error al obtener el presupuesto.",
                    content = @Content(mediaType = "application/json")
            )
    })
    @GetMapping(path = "/user/{userId}/category/{categoryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExtendedBaseResponse<BudgetDto>> getBudgetByUserIdAndCategoryId(
            @PathVariable Long userId,
            @PathVariable Long categoryId
    ) {
        ExtendedBaseResponse<BudgetDto> response = budgetService.getBudgetByUserIdAndCategoryId(userId, categoryId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Obtener todos los presupuestos", description = "Devuelve una lista de todos los presupuestos.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Presupuestos obtenidos exitosamente.",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExtendedBaseResponse.class))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error al obtener los presupuestos.",
                    content = @Content(mediaType = "application/json")
            )
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExtendedBaseResponse<List<BudgetDto>>> getAllBudgets() {
        ExtendedBaseResponse<List<BudgetDto>> response = budgetService.getListBudget();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Actualizar un presupuesto", description = "Actualiza un presupuesto existente por su ID.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Presupuesto actualizado exitosamente.",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExtendedBaseResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Presupuesto no encontrado.",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error al actualizar el presupuesto.",
                    content = @Content(mediaType = "application/json")
            )
    })
    @PutMapping(path = "/update", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExtendedBaseResponse<BudgetDto>> updateBudget(@Valid @RequestBody UpdateBudget updateBudget) {
        ExtendedBaseResponse<BudgetDto> response = budgetService.upDate(updateBudget);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Eliminar un presupuesto", description = "Elimina un presupuesto por su ID.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Presupuesto eliminado exitosamente.",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Presupuesto no encontrado.",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error al eliminar el presupuesto.",
                    content = @Content(mediaType = "application/json")
            )
    })
    @DeleteMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BaseResponse> deleteBudget(@PathVariable Long id) {
        BaseResponse response = budgetService.deleteBudget(id);
        return ResponseEntity.ok(response);
    }
}
