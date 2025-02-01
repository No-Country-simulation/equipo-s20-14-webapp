package org.project.app.dto.user;

import java.io.Serializable;

public record BalanceUserDto(
    Double balance,
    Double totalExpenses,
    Double totalIncomes
) implements Serializable {
}
