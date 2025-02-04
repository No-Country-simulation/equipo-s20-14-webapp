package org.project.app.dto.budget;

import org.project.app.dto.category.CategoryDto;

import java.io.Serializable;

public record BudgetDto(
        Long id,
        Double budgetamount,
        CategoryDto categoryDto,
        Long userId
) implements Serializable {
}
