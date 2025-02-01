package org.project.app.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.project.app.dto.transaction.TransactionDto;
import org.project.app.model.Transaction;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface TransactionMapper {

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "category", ignore = true)
    Transaction toEntity(TransactionDto transactionDto);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "category.id", target = "categoryId")
    TransactionDto toDto(Transaction transaction);

    List<TransactionDto> entityListToDtoList(List<Transaction> transactionList);

    List<Transaction> dtoListToEntityList(List<TransactionDto> transactionDtoList);

}
