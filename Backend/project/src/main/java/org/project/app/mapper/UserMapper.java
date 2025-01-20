package org.project.app.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.project.app.dto.user.AuthResponseDto;
import org.project.app.dto.user.UpdatedUserDto;
import org.project.app.dto.user.UserDto;
import org.project.app.model.User;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

    User toEntity(UserDto userDto);

    @Mapping(target = "username", expression = "java(mapUsername(user))")
    UserDto toDto(User user);

    List<UserDto> entityListToDtoList(List<User> users);

    @Mapping(source = "id", target = "userId")
    @Mapping(target = "username", expression = "java(mapUsername(user))")
    UpdatedUserDto toUpdatedUser(User user);

    @Mapping(source = "id", target = "id")
    @Mapping(target = "username", expression = "java(mapUsername(user))")
    @Mapping(target = "token", ignore = true)
    AuthResponseDto toAuthResponse(User user);

    default String mapUsername(User user) {return user.getName();}

}
