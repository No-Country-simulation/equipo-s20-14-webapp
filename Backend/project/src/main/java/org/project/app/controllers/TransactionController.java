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
import org.project.app.dto.transaction.RequestTransactionDto;
import org.project.app.dto.transaction.TransactionDto;
import org.project.app.service.TransactionService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Transaction", description = "API para gestionar transacciones")
@RestController
@RequestMapping("/transaction")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @Operation(summary = "Crear una nueva transacción", description = "Crea una nueva transacción en la base de datos")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Transacción creada exitosamente",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExtendedBaseResponse.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Datos inválidos en la solicitud",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error al crear la transacción",
                    content = @Content(mediaType = "application/json")
            )
    })
    @PostMapping(path = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExtendedBaseResponse<TransactionDto>> createTransaction(
            @Valid @RequestBody RequestTransactionDto requestTransactionDto) {
        ExtendedBaseResponse<TransactionDto> response = transactionService.createTransaction(requestTransactionDto);
        return ResponseEntity.status(201).body(response);
    }

    @Operation(summary = "Obtener transacciones por usuario", description = "Devuelve todas las transacciones de un usuario específico")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Transacciones obtenidas exitosamente",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExtendedBaseResponse.class))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error al obtener las transacciones",
                    content = @Content(mediaType = "application/json")
            )
    })
    @GetMapping(path = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExtendedBaseResponse<List<TransactionDto>>> getTransactionsByUser(
            @RequestParam Long userId) {
        ExtendedBaseResponse<List<TransactionDto>> response = transactionService.getTransactionsByUser(userId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Eliminar una transacción", description = "Elimina una transacción por su ID")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Transacción eliminada exitosamente",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = BaseResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Transacción no encontrada",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error al eliminar la transacción",
                    content = @Content(mediaType = "application/json")
            )
    })
    @DeleteMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BaseResponse> deleteTransaction(@PathVariable Long id) {
        BaseResponse response = transactionService.deleteTransaction(id);
        return ResponseEntity.ok(response);
    }
}