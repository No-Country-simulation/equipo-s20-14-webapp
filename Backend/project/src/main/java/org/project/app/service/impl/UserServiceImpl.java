package org.project.app.service.impl;


import lombok.RequiredArgsConstructor;
import org.project.app.dto.BaseResponse;
import org.project.app.dto.ExtendedBaseResponse;
import org.project.app.dto.user.*;
import org.project.app.exception.userExc.UserNotFoundException;
import org.project.app.mapper.UserMapper;
import org.project.app.model.Transaction;
import org.project.app.model.User;
import org.project.app.repository.TransactionRepository;
import org.project.app.repository.UserRepository;
import org.project.app.service.UserService;
import org.project.app.service.api.ImageService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final ImageService imageService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final TransactionRepository transactionRepository;
    @Override
    @Transactional
    public ExtendedBaseResponse<String> upDateImagesUser(UpDateImagesUserDto upDateImagesUser) {
        String newImageUrl = uploadSingleImage(upDateImagesUser.getImage());
        User user = userRepository.findById(upDateImagesUser.getUserId()).orElseThrow(() ->
                new UserNotFoundException("Este usuario no existe con ese ID: " + upDateImagesUser.getUserId()));

        if (user.getUserImage() != null && !user.getUserImage().isEmpty()) {
            deleteSingleImage(user.getUserImage());
        }

        user.setUserImage(newImageUrl);
        User savedUser = userRepository.save(user);
        return ExtendedBaseResponse.of(BaseResponse.created("Imagen actualizada correctamente"), savedUser.getUserImage());
    }


    @Override
    @Transactional(readOnly = true)
    public ExtendedBaseResponse<UserDto> findUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() ->
                new UserNotFoundException("Este usuario no existe con ese ID: " + id));
        UserDto userDto = userMapper.toDto(user);
        return ExtendedBaseResponse.of(BaseResponse.created("Usuario encontrado exitosamente"), userDto);
    }

    @Override
    @Transactional
    public ExtendedBaseResponse<UpdatedUserDto> updateUser(UpdateUserDto updateUserDto) {
        User user = userRepository.findById(updateUserDto.userId())
                .orElseThrow(() -> new UserNotFoundException("Este usuario no existe con ese ID: " + updateUserDto.userId()));
        if (updateUserDto.username() != null && !updateUserDto.username().isBlank()) {
            user.setUsername(updateUserDto.username());
        }
        if (updateUserDto.email() != null && !updateUserDto.email().isBlank()) {
            user.setEmail(updateUserDto.email());
        }
        if (updateUserDto.contact() != null && !updateUserDto.contact().isBlank()) {
            user.setContact(updateUserDto.contact());
        }
        if (updateUserDto.password() != null && !updateUserDto.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(updateUserDto.password()));
        }
        userRepository.save(user);
        UpdatedUserDto updatedUserDto = userMapper.toUpdatedUser(user);
        return ExtendedBaseResponse.of(BaseResponse.ok("Usuario actualizado"), updatedUserDto);
    }

    @Override
    @Transactional
    public ExtendedBaseResponse<BalanceUserDto> getBalance(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("Usuario no encontrado con ID: " + id);
        }

        List<Transaction> transactions = transactionRepository.findByUserId(id);

        return ExtendedBaseResponse.of(
                BaseResponse.ok("Balance obtenido exitosamente"),
                calculateBalance(transactions)
        );
    }

    private BalanceUserDto calculateBalance(List<Transaction> transactions) {
        Map<Boolean, Double> amountsByType = transactions.stream()
                .collect(Collectors.partitioningBy(
                        Transaction::getIsSpent,
                        Collectors.summingDouble(Transaction::getAmount)
                ));

        Double totalExpenses = amountsByType.get(true);
        Double totalIncomes = amountsByType.getOrDefault(false, 0.0);
        Double balance = totalIncomes - (totalExpenses != null ? totalExpenses : 0.0);

        return new BalanceUserDto(
                balance,
                totalExpenses != null ? totalExpenses : 0.0,
                totalIncomes
        );
    }

    private String uploadSingleImage(MultipartFile image) {
        try {
            return imageService.uploadImage(image);
        } catch (IOException e) {
            throw new RuntimeException("Error al subir la imagen", e);
        }
    }

    private void deleteSingleImage(String imageUrl) {
        try {
            imageService.deleteImage(imageUrl);
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar la imagen", e);
        }
    }

}