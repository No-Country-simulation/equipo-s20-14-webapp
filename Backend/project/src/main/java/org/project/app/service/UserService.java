package org.project.app.service;


import org.project.app.dto.ExtendedBaseResponse;
import org.project.app.dto.user.*;

public interface UserService {

    ExtendedBaseResponse<String> upDateImagesUser(UpDateImagesUserDto upDateImagesUser);

    ExtendedBaseResponse<UserDto> findUserById(Long id);

    ExtendedBaseResponse<UpdatedUserDto> updateUser(UpdateUserDto updateUserDto);

    ExtendedBaseResponse<BalanceUserDto> getBalance(Long id);

}
