package org.project.app.exception.notificationExc;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NotificationFoundException extends RuntimeException{
    public NotificationFoundException(String message) {
        super(message);
    }
}
