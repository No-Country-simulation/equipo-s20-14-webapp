package org.project.app.exception;

import org.project.app.dto.BaseResponse;
import org.project.app.exception.BudgetExc.BudgetNotFoundException;
import org.project.app.exception.userExc.EmailNotFoundException;
import org.project.app.exception.userExc.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Maneja RuntimeException (errores inesperados)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<BaseResponse> handleRuntimeException(RuntimeException ex) {
        // Log del error (opcional)
        ex.printStackTrace();

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR) // Código 500
                .body(BaseResponse.error("Error inesperado: " + ex.getMessage()));
    }

    // Maneja IllegalArgumentException (errores de validación manual)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<BaseResponse> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST) // Código 400
                .body(BaseResponse.badRequest(ex.getMessage()));
    }

    // Maneja EmailNotFoundException (errores específicos de negocio)
    @ExceptionHandler(EmailNotFoundException.class)
    public ResponseEntity<BaseResponse> handleEmailNotFound(EmailNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND) // Código 404
                .body(BaseResponse.error(HttpStatus.NOT_FOUND, ex.getMessage()));
    }

    // Maneja UserNotFoundException (errores específicos de negocio)
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<BaseResponse> handleUserNotFound(UserNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND) // Código 404
                .body(BaseResponse.error(HttpStatus.NOT_FOUND, ex.getMessage()));
    }

    // Maneja BudgetNotFoundException (errores específicos de negocio)
    @ExceptionHandler(BudgetNotFoundException.class)
    public ResponseEntity<BaseResponse> handleBudgetNotFoundException(BudgetNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND) // Código 404
                .body(BaseResponse.error(HttpStatus.NOT_FOUND, ex.getMessage()));
    }

    // Maneja errores de validación de datos (MethodArgumentNotValidException)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST) // Código 400
                .body(errors);
    }

    // Maneja cualquier otra excepción no controlada (errores inesperados)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponse> handleGenericException(Exception ex) {
        // Log del error (opcional)
        ex.printStackTrace();

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR) // Código 500
                .body(BaseResponse.error("Error interno del servidor"));
    }
}
