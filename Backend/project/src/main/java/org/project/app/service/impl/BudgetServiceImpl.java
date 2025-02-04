package org.project.app.service.impl;

import lombok.RequiredArgsConstructor;
import org.project.app.dto.BaseResponse;
import org.project.app.dto.ExtendedBaseResponse;
import org.project.app.dto.budget.BudgetDto;
import org.project.app.dto.budget.RequestBudgetDto;
import org.project.app.dto.budget.UpdateBudget;
import org.project.app.exception.BudgetExc.BudgetNotFoundException;
import org.project.app.mapper.BudgetMapper;
import org.project.app.model.Budget;
import org.project.app.model.Category;
import org.project.app.model.User;
import org.project.app.repository.BudgetRepository;
import org.project.app.repository.CategoryRepository;
import org.project.app.repository.UserRepository;
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
    private final UserRepository userRepository;

    @Override
    @Transactional
    public ExtendedBaseResponse<BudgetDto> createBudget(RequestBudgetDto requestBudgetDto) {
        Category category = categoryRepository.findById(requestBudgetDto.idCategory()).orElseThrow(() ->
                new RuntimeException("Categoría no encontrada"));
        User user = userRepository.findById(requestBudgetDto.idUser()).orElseThrow(
                () -> new RuntimeException("Usuario no encontrado"));
        Budget budget = Budget.builder()
                .budgetamount(requestBudgetDto.budgetamount())
                .category(category)
                .user(user)
                .build();
        budgetRepository.save(budget);
        BudgetDto budgetDto = budgetMapper.toDto(budget);
        return ExtendedBaseResponse.of(BaseResponse.created("Presupuesto creado exitosamente"), budgetDto);
    }

    @Override
    @Transactional(readOnly = true)
    public ExtendedBaseResponse<BudgetDto> getBudgetByUserIdAndCategoryId(Long userId, Long categoryId) {
        Budget budget = budgetRepository.findByUserIdAndCategoryId(userId, categoryId)
                .orElseThrow(() -> new BudgetNotFoundException("No se encontró un presupuesto para el usuario y categoría especificados"));
        BudgetDto budgetDto = budgetMapper.toDto(budget);
        return ExtendedBaseResponse.of(BaseResponse.ok("Presupuesto encontrado exitosamente"), budgetDto);
    }

    @Override
    @Transactional(readOnly = true)
    public ExtendedBaseResponse<List<BudgetDto>> getListBudgetByUserId(Long userId) {
        List<Budget> budgetList = budgetRepository.findByUserId(userId);
        if (budgetList.isEmpty()) {
            throw new BudgetNotFoundException("No se encontraron presupuestos para el usuario especificado");
        }
        List<BudgetDto> budgetDtoList = budgetMapper.entityListToDtoList(budgetList);
        return ExtendedBaseResponse.of(BaseResponse.ok("Lista de presupuestos obtenida exitosamente"), budgetDtoList);
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
