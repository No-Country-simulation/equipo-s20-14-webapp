package org.project.app.dto.user;

import java.io.Serializable;

public record EmailDto(
        String email

) implements Serializable {
}
