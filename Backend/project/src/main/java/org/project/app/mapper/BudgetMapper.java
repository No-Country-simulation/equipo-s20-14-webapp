package org.project.app.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.project.app.dto.budget.BudgetDto;
import org.project.app.model.Budget;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING,
        uses = CategoryMapper.class)
public interface BudgetMapper {

    Budget toEntity(BudgetDto budgetDto);

    @Mapping(source = "category", target = "categoryDto")
    @Mapping(source = "user.id", target = "userId")
    BudgetDto toDto(Budget budget);

    List<BudgetDto> entityListToDtoList(List<Budget> budgetList);

}
