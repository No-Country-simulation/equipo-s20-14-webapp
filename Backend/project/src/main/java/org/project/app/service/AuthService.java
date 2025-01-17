package org.project.app.service;


import org.project.app.dto.ExtendedBaseResponse;
import org.project.app.dto.user.*;

public interface AuthService {
    ExtendedBaseResponse<AuthResponseDto> login(LoginRequestDto request);

    ExtendedBaseResponse<AuthResponseDto> register(RegisterRequestDto request);

    ExtendedBaseResponse<String> generatePasswordResetToken(EmailDto email);

    void resetPassword(ResetPasswordRequest request);

}
