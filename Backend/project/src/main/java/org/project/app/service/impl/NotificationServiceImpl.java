package org.project.app.service.impl;

import lombok.RequiredArgsConstructor;
import org.project.app.dto.BaseResponse;
import org.project.app.dto.ExtendedBaseResponse;
import org.project.app.dto.notification.NotificationDto;
import org.project.app.exception.notificationExc.NotificationFoundException;
import org.project.app.exception.userExc.UserNotFoundException;
import org.project.app.mapper.NotificationMapper;
import org.project.app.model.Notification;
import org.project.app.model.User;
import org.project.app.repository.NotificationRepository;
import org.project.app.repository.UserRepository;
import org.project.app.service.NotificationService;
import org.project.app.service.api.EmailService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final NotificationMapper notificationMapper;

    @Override
    @Transactional
    public ExtendedBaseResponse<NotificationDto> createNotification(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new UserNotFoundException("Este usuario no existe con ese ID: " + userId));
        String message = "Has excedido tu presupuesto. Revisa tus gastos para mantener un mejor control, Atentamente CLARA.";
        Notification notification = Notification.builder()
                .message(message)
                .user(user)
                .build();
        notificationRepository.save(notification);
        NotificationDto notificationDto = notificationMapper.toDto(notification);
        String formattedDate = notification.getDateCreation().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"));
        try {
            emailService.sendEmail(user.getEmail(),
                    "Alerta de presupuesto excedido, API CLARA",
                    message + "\nFecha de creación: " + formattedDate);
        } catch (Exception e) {
            System.err.println("Error enviando correo electrónico: " + e.getMessage());
            return ExtendedBaseResponse.of(BaseResponse.created(
                    "Notificación creada pero hubo un problema al enviar el correo"), notificationDto);
        }
        return ExtendedBaseResponse.of(BaseResponse.created("Notificación creada y correo enviado exitosamente"), notificationDto);
    }

    @Override
    @Transactional(readOnly = true)
    public ExtendedBaseResponse<List<NotificationDto>> getNotificationsByUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new UserNotFoundException("Este usuario no existe con ese ID: " + userId));
        List<Notification> notifications = notificationRepository.findByUserId(user.getId());
        List<NotificationDto> notificationDtos = notificationMapper.entityListToDtoList(notifications);
        return ExtendedBaseResponse.of(
                BaseResponse.ok("Notificaciones obtenidas exitosamente"),
                notificationDtos
        );
    }

    @Override
    @Transactional
    public BaseResponse deleteNotification(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElseThrow(() ->
                new NotificationFoundException("No existe una notificación con el ID proporcionado: " + notificationId));
        notificationRepository.delete(notification);
        return BaseResponse.ok("Notificación eliminada exitosamente");
    }

    @Override
    @Transactional
    public BaseResponse deleteAllNotificationsByUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new UserNotFoundException("Este usuario no existe con ese ID: " + userId));
        notificationRepository.deleteByUserId(user.getId());
        return BaseResponse.ok("Todas las notificaciones del usuario han sido eliminadas exitosamente");
    }
}