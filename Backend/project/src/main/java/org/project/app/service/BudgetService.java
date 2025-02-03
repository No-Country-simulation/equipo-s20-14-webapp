package org.project.app.service;

import org.project.app.dto.BaseResponse;
import org.project.app.dto.ExtendedBaseResponse;
import org.project.app.dto.budget.BudgetDto;
import org.project.app.dto.budget.RequestBudgetDto;
import org.project.app.dto.budget.UpdateBudget;

import java.util.List;

public interface BudgetService {

    ExtendedBaseResponse<BudgetDto> createBudget(RequestBudgetDto requestBudgetDto);

    ExtendedBaseResponse<BudgetDto> getBudgetByUserIdAndCategoryId(Long userId, Long categoryId);

    ExtendedBaseResponse<List<BudgetDto>> getListBudget();

    ExtendedBaseResponse<BudgetDto> upDate(UpdateBudget updateBudget);

    BaseResponse deleteBudget(Long id);

}
