package org.project.app.service;

import org.project.app.dto.BaseResponse;
import org.project.app.dto.ExtendedBaseResponse;
import org.project.app.dto.transaction.RequestTransactionDto;
import org.project.app.dto.transaction.TransactionDto;

import java.util.List;

public interface TransactionService {

    ExtendedBaseResponse<TransactionDto> createTransaction(RequestTransactionDto requestTransactionDto);

    ExtendedBaseResponse<List<TransactionDto>> getTransactionsByUser(Long userId);

    BaseResponse deleteTransaction(Long transactionId);

}
