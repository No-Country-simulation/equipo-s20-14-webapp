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
import org.project.app.dto.category.CategoryDto;
import org.project.app.dto.category.RequestCategoryDto;
import org.project.app.service.CategoryService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Category", description = "API para gestionar categorías")
@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @Operation(summary = "Crear una nueva categoría", description = "Crea una nueva categoría en la base de datos.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Categoría creada exitosamente.",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExtendedBaseResponse.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Datos inválidos en la solicitud.",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error al crear la categoría.",
                    content = @Content(mediaType = "application/json")
            )
    })
    @PostMapping(path = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExtendedBaseResponse<CategoryDto>> createCategory(@Valid @RequestBody RequestCategoryDto requestCategoryDto) {
        ExtendedBaseResponse<CategoryDto> response = categoryService.createCategory(requestCategoryDto);
        return ResponseEntity.status(201).body(response);
    }

    @Operation(summary = "Obtener todas las categorías", description = "Devuelve una lista de todas las categorías.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Categorías obtenidas exitosamente.",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExtendedBaseResponse.class))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error al obtener las categorías.",
                    content = @Content(mediaType = "application/json")
            )
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExtendedBaseResponse<List<CategoryDto>>> getAllCategories() {
        ExtendedBaseResponse<List<CategoryDto>> response = categoryService.getAllCategories();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Eliminar una categoría", description = "Elimina una categoría por su ID.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Categoría eliminada exitosamente.",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Categoría no encontrada.",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error al eliminar la categoría.",
                    content = @Content(mediaType = "application/json")
            )
    })
    @DeleteMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BaseResponse> deleteCategory(@PathVariable Long id) {
        BaseResponse response = categoryService.deleteCategory(id);
        return ResponseEntity.ok(response);
    }
}


