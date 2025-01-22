package org.project.app.dto.user;

import java.io.Serializable;

public record ResetPasswordRequest(
        String token,
        String newPassword

) implements Serializable {
}
