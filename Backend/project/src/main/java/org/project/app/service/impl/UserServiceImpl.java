package org.project.app.service.impl;


import lombok.RequiredArgsConstructor;
import org.project.app.dto.BaseResponse;
import org.project.app.dto.ExtendedBaseResponse;
import org.project.app.dto.user.*;
import org.project.app.exception.userExc.UserNotFoundException;
import org.project.app.mapper.UserMapper;
import org.project.app.model.User;
import org.project.app.repository.UserRepository;
import org.project.app.service.UserService;
import org.project.app.service.api.ImageService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final ImageService imageService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    @Override
    @Transactional
    public ExtendedBaseResponse<String> upDateImagesUser(UpDateImagesUserDto upDateImagesUser) {
        String newImageUrl = uploadSingleImage(upDateImagesUser.getImage());
        User user = userRepository.findById(upDateImagesUser.getUserId()).orElseThrow(() ->
                new UserNotFoundException("This User Does Not Exist with that Id: " + upDateImagesUser.getUserId()));

        if (user.getUserImage() != null && !user.getUserImage().isEmpty()) {
            deleteSingleImage(user.getUserImage());
        }

        user.setUserImage(newImageUrl);
        User savedUser = userRepository.save(user);
        return ExtendedBaseResponse.of(BaseResponse.created("Image Updated Successfully"), savedUser.getUserImage());
    }


    @Override
    @Transactional(readOnly = true)
    public ExtendedBaseResponse<UserDto> findUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() ->
                new UserNotFoundException("This User Does Not Exist with that Id: " + id));
        UserDto userDto = userMapper.toDto(user);
        return ExtendedBaseResponse.of(BaseResponse.created("User Found Successfully"), userDto);
    }

    @Override
    @Transactional
    public ExtendedBaseResponse<UpdatedUserDto> updateUser(UpdateUserDto updateUserDto) {
        User user = userRepository.findById(updateUserDto.userId())
                .orElseThrow(() -> new UserNotFoundException("This User Does Not Exist with that Id: " + updateUserDto.userId()));
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
        return ExtendedBaseResponse.of(BaseResponse.ok("User Updated"), updatedUserDto);
    }



    private String uploadSingleImage(MultipartFile image) {
        try {
            return imageService.uploadImage(image);
        } catch (IOException e) {
            throw new RuntimeException("Error uploading image", e);
        }
    }

    private void deleteSingleImage(String imageUrl) {
        try {
            imageService.deleteImage(imageUrl);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting image", e);
        }
    }

}