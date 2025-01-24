package org.project.app.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.project.app.dto.notification.NotificationDto;
import org.project.app.model.Notification;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface NotificationMapper {
    @Mapping(target = "user", ignore = true)
    Notification toEntity(NotificationDto notificationDto);

    @Mapping(source = "user.id", target = "userId")
    NotificationDto toDto(Notification notification);

    List<NotificationDto> entityListToDtoList(List<Notification> notificationList);

    List<Notification> dtoListToEntityList(List<NotificationDto> notificationDtoList);
}
