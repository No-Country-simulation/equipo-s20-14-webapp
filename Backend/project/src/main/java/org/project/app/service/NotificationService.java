package org.project.app.service;


import org.project.app.dto.BaseResponse;
import org.project.app.dto.ExtendedBaseResponse;
import org.project.app.dto.notification.NotificationDto;

import java.util.List;

public interface NotificationService {

    ExtendedBaseResponse<NotificationDto> createNotification(Long userId);

    ExtendedBaseResponse<List<NotificationDto>> getNotificationsByUser(Long userId);

    BaseResponse deleteNotification(Long notificationId);

    BaseResponse deleteAllNotificationsByUser(Long userId);

}
