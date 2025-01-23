package org.project.app.service;


import org.project.app.dto.ExtendedBaseResponse;
import org.project.app.dto.user.UpDateImagesUserDto;
import org.project.app.dto.user.UpdateUserDto;
import org.project.app.dto.user.UpdatedUserDto;
import org.project.app.dto.user.UserDto;

public interface UserService {

    ExtendedBaseResponse<String> upDateImagesUser(UpDateImagesUserDto upDateImagesUser);

    ExtendedBaseResponse<UserDto> findUserById(Long id);

    ExtendedBaseResponse<UpdatedUserDto> updateUser(UpdateUserDto updateUserDto);

}
