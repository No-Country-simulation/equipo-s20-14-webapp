package org.project.app.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

public record RegisterRequestDto(
        @Pattern(
                regexp = "^(?=\\S*[a-zA-ZÀ-ÿ])(?=(?:\\S*\\s*){3,})[a-zA-ZÀ-ÿ\\s'-]+$",
                message = "El nombre de usuario debe tener al menos 3 letras y puede incluir espacios, apóstrofes o guiones"
        )
        @NotBlank(message = "El nombre de usuario no puede estar en blanco")
        @Size(max = 50, message = "El nombre de usuario no puede exceder los 50 caracteres")
        String username,

        @Pattern(
                regexp = "^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,6}$",
                message = "El correo electrónico debe ser válido y contener un dominio correcto"
        )
        @Email(message = "El correo electrónico debe ser valido, utilizando ´@´")
        @NotBlank(message = "El correo electrónico no puede estar en blanco")
        @Size(max = 100, message = "El correo electrónico no puede exceder los 100 caracteres")
        String email,

        @Pattern(
                regexp = "^[0-9]+$",
                message = "El contacto solo puede contener números positivos"
        )
        @NotBlank(message = "El contacto no puede estar en blanco")
        @Size(max = 20, message = "El contacto no puede exceder los 20 caracteres")
        String contact,

        @NotBlank(message = "La contraseña no puede estar en blanco")
        @Pattern(
                regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$",
                message = """
                        La contraseña debe tener al menos 8 caracteres,
                        contener al menos un dígito, una letra minúscula, una letra mayúscula,
                        un carácter especial (@#$%^&+=) y no debe tener espacios."""
        )
        @Size(max = 64, message = "La contraseña no puede exceder los 64 caracteres")
        String password

) implements Serializable {
}


