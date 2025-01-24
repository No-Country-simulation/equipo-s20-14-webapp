package org.project.app.dto.notification;

import java.io.Serializable;
import java.time.LocalDateTime;

public record NotificationDto(
        Long id,
        String message,
        LocalDateTime dateCreation,
        Long userId
) implements Serializable {
}
