package org.project.app.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.project.app.dto.BaseResponse;
import org.project.app.dto.ExtendedBaseResponse;
import org.project.app.dto.notification.NotificationDto;
import org.project.app.service.NotificationService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Notification", description = "Gestionar todos los End-points relacionados con las notificaciones de usuarios.")
@RestController
@RequestMapping("/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @Operation(
            summary = "Crear una notificación para un usuario",
            description = "Crea una notificación personalizada para un usuario dado su ID."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Notificación creada exitosamente.",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acceso prohibido. No tienes permisos para realizar esta acción.",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Usuario no encontrado.",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error al crear la notificación.",
                    content = @Content
            )
    })
    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ExtendedBaseResponse<NotificationDto> createNotification(@RequestParam Long userId) {
        return notificationService.createNotification(userId);
    }

    @Operation(
            summary = "Obtener notificaciones de un usuario",
            description = "Obtiene todas las notificaciones asociadas a un usuario dado su ID."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Notificaciones obtenidas exitosamente.",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acceso prohibido. No tienes permisos para realizar esta acción.",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Usuario no encontrado.",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error al obtener las notificaciones.",
                    content = @Content
            )
    })
    @GetMapping(value = "/user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ExtendedBaseResponse<List<NotificationDto>> getNotificationsByUser(@PathVariable Long userId) {
        return notificationService.getNotificationsByUser(userId);
    }

    @Operation(
            summary = "Eliminar una notificación",
            description = "Elimina una notificación específica dado su ID."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Notificación eliminada exitosamente.",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acceso prohibido. No tienes permisos para realizar esta acción.",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Notificación no encontrada.",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error al eliminar la notificación.",
                    content = @Content
            )
    })
    @DeleteMapping(value = "/delete/{notificationId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public BaseResponse deleteNotification(@PathVariable Long notificationId) {
        return notificationService.deleteNotification(notificationId);
    }

    @Operation(
            summary = "Eliminar todas las notificaciones de un usuario",
            description = "Permite eliminar todas las notificaciones asociadas a un usuario proporcionado su ID."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Notificaciones eliminadas exitosamente.",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Acceso prohibido. No tienes permisos para realizar esta acción.",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Usuario no encontrado.",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error al eliminar las notificaciones.",
                    content = @Content
            )
    })
    @DeleteMapping("/user/{userId}/delete-all")
    public BaseResponse deleteAllNotifications(@PathVariable Long userId) {
        return notificationService.deleteAllNotificationsByUser(userId);
    }

}

