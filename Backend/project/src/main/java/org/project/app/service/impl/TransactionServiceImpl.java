package org.project.app.service.impl;

import lombok.RequiredArgsConstructor;
import org.project.app.dto.BaseResponse;
import org.project.app.dto.ExtendedBaseResponse;
import org.project.app.dto.transaction.RequestTransactionDto;
import org.project.app.dto.transaction.TransactionDto;
import org.project.app.exception.userExc.UserNotFoundException;
import org.project.app.mapper.TransactionMapper;
import org.project.app.model.Category;
import org.project.app.model.Transaction;
import org.project.app.model.User;
import org.project.app.repository.CategoryRepository;
import org.project.app.repository.TransactionRepository;
import org.project.app.repository.UserRepository;
import org.project.app.service.TransactionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    @Override
    @Transactional
    public ExtendedBaseResponse<TransactionDto> createTransaction(RequestTransactionDto requestTransactionDto) {
        Category category = categoryRepository.findById(requestTransactionDto.categoryId()).orElseThrow(
                () -> new RuntimeException("Categoria no encontrada"));
        User user = userRepository.findById(requestTransactionDto.userId()).orElseThrow(
                () -> new RuntimeException("Usuario no encontrado"));
        Transaction transaction = Transaction.builder()
                .amount(requestTransactionDto.amount())
                .isSpent(requestTransactionDto.isSpent())
                .description(requestTransactionDto.description())
                .isFixed(requestTransactionDto.isFixed())
                .cycleDays(requestTransactionDto.cycleDays())
                .category(category)
                .user(user)
                .build();
        transactionRepository.save(transaction);
        TransactionDto transactionDto = transactionMapper.toDto(transaction);
        return ExtendedBaseResponse.of(BaseResponse.created("Transaccion creada exitosamente"), transactionDto);
    }

    @Override
    @Transactional(readOnly = true)
    public ExtendedBaseResponse<List<TransactionDto>> getTransactionsByUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("Usuario no encontrado"));
        List<Transaction> transactions = transactionRepository.findByUserId(user.getId());
        List<TransactionDto> transactionDtos = transactionMapper.entityListToDtoList(transactions);
        return ExtendedBaseResponse.of(BaseResponse.ok("Transacciones obtenidas exitosamente"), transactionDtos);
    }

    @Override
    public BaseResponse deleteTransaction(Long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId).orElseThrow(
                () -> new RuntimeException("Transaccion no encontrada")
        );
        transactionRepository.delete(transaction);
        return BaseResponse.ok("Transaccion eliminada exitosamente");
    }
}
