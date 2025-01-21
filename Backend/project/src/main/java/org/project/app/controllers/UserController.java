package org.project.app.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.project.app.dto.ExtendedBaseResponse;
import org.project.app.dto.user.UpDateImagesUserDto;
import org.project.app.dto.user.UpdateUserDto;
import org.project.app.dto.user.UpdatedUserDto;
import org.project.app.dto.user.UserDto;
import org.project.app.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Usuarios", description = "Gestionar todos los End-Points de usuarios.")
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(
            summary = "Actualizar la imagen de un usuario",
            description = "Permite actualizar la imagen de perfil de un usuario proporcionado su ID y una nueva imagen, " +
                    "si esta ya tiene, borra la anterior y la actualiza."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Imagen actualizada exitosamente.",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExtendedBaseResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Usuario no encontrado.",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error al actualizar la imagen.",
                    content = @Content
            )
    })
    @PostMapping(value = "/images/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ExtendedBaseResponse<String>> updateUserImage(@Valid @ModelAttribute UpDateImagesUserDto dto) {
        ExtendedBaseResponse<String> datos = userService.upDateImagesUser(dto);
        return ResponseEntity.status(201).body(datos);
    }

    @Operation(
            summary = "Buscar usuario por ID",
            description = "Obtiene los datos de un usuario según su ID."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Usuario encontrado exitosamente.",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserDto.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Usuario no encontrado.",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error al buscar el usuario.",
                    content = @Content
            )
    })
    @GetMapping("/{id}")
    public ResponseEntity<ExtendedBaseResponse<UserDto>> findUserById(@PathVariable Long id) {
        ExtendedBaseResponse<UserDto> response = userService.findUserById(id);
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Actualizar datos de un usuario",
            description = "Permite actualizar los datos de un usuario proporcionado su ID y los nuevos valores."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Usuario actualizado exitosamente.",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = UpdatedUserDto.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Usuario no encontrado.",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error al actualizar los datos del usuario.",
                    content = @Content
            )
    })
    @PutMapping(value = "/update", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ExtendedBaseResponse<UpdatedUserDto> updateUser(@Valid @RequestBody UpdateUserDto updateUserDto) {
        return userService.updateUser(updateUserDto);
    }
}
