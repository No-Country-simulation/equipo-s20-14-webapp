package org.project.app.service.impl;

import lombok.RequiredArgsConstructor;
import org.project.app.dto.BaseResponse;
import org.project.app.dto.ExtendedBaseResponse;
import org.project.app.dto.budget.BudgetDto;
import org.project.app.dto.budget.RequestBudgetDto;
import org.project.app.dto.budget.UpdateBudget;
import org.project.app.mapper.BudgetMapper;
import org.project.app.model.Budget;
import org.project.app.model.Category;
import org.project.app.repository.BudgetRepository;
import org.project.app.repository.CategoryRepository;
import org.project.app.service.BudgetService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetServiceImpl implements BudgetService {

    private final BudgetRepository budgetRepository;
    private final CategoryRepository categoryRepository;
    private final BudgetMapper budgetMapper;

    @Override
    @Transactional
    public ExtendedBaseResponse<BudgetDto> createBudget(RequestBudgetDto requestBudgetDto) {
        Category category = categoryRepository.findById(requestBudgetDto.idCategory()).orElseThrow(() ->
                new RuntimeException("Categoría no encontrada"));
        Budget budget = Budget.builder()
                .budgetamount(requestBudgetDto.budgetamount())
                .category(category)
                .build();
        budgetRepository.save(budget);
        BudgetDto budgetDto = budgetMapper.toDto(budget);
        return ExtendedBaseResponse.of(BaseResponse.created("Presupuesto creado exitosamente"), budgetDto);
    }

    @Override
    @Transactional(readOnly = true)
    public ExtendedBaseResponse<BudgetDto> getBudgetById(Long id) {
        Budget budget = budgetRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Categoría no encontrada"));
        BudgetDto budgetDto = budgetMapper.toDto(budget);
        return ExtendedBaseResponse.of(BaseResponse.created("Presupuesto encontrado exitosamente"), budgetDto);
    }

    @Override
    @Transactional(readOnly = true)
    public ExtendedBaseResponse<List<BudgetDto>> getListBudget() {
        List<Budget> budgetList = budgetRepository.findAll();
        List<BudgetDto> budgetDtoList = budgetMapper.entityListToDtoList(budgetList);
        return ExtendedBaseResponse.of(BaseResponse.ok("Lista de Presupuesto obtenidas exitosamente"), budgetDtoList);
    }

    @Override
    @Transactional
    public ExtendedBaseResponse<BudgetDto> upDate(UpdateBudget updateBudget) {
        Budget budget = budgetRepository.findById(updateBudget.idPresupuesto()).orElseThrow(() ->
                new RuntimeException("Categoría no encontrada"));
        budget.setBudgetamount(updateBudget.budgetamount());
        budgetRepository.save(budget);
        BudgetDto budgetDto = budgetMapper.toDto(budget);
        return ExtendedBaseResponse.of(BaseResponse.ok("Presupuesto actualizado"), budgetDto);
    }

    @Override
    @Transactional
    public BaseResponse deleteBudget(Long id) {
        budgetRepository.findById(id).orElseThrow(() -> new RuntimeException("Presupuesto no encontrada"));
        budgetRepository.deleteById(id);
        return BaseResponse.ok("Presupuesto eliminada exitosamente");
    }

}
