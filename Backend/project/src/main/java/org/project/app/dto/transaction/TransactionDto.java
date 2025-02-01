package org.project.app.dto.transaction;

import java.io.Serializable;
import java.time.LocalDateTime;

public record TransactionDto(
    Long id,
    LocalDateTime dateCreation,
    Double amount,
    String description,
    Boolean isSpent,
    Boolean isFixed,
    Integer cycleDays,
    Long categoryId,
    Long userId
) implements Serializable {
}
