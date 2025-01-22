package org.project.app.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;

import java.io.Serializable;

public record AuthResponseDto(
        @Schema(description = "ID del usuario", example = "1")
        Long id,

        @Schema(description = "Nombre de usuario", example = "Florencia Galeassi")
        String username,

        @Schema(description = "Token de autenticación JWT", example = "eyJhbGciOiJIUzUxMiJ9...")
        String token
) implements Serializable {
}


