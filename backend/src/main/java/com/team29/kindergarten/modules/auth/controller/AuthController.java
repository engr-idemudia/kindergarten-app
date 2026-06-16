package com.team29.kindergarten.modules.auth.controller;

import com.team29.kindergarten.modules.auth.dto.AuthResponse;
import com.team29.kindergarten.modules.auth.dto.ForgotPasswordRequest;
import com.team29.kindergarten.modules.auth.dto.LoginRequest;
import com.team29.kindergarten.modules.auth.dto.RegisterRequest;
import com.team29.kindergarten.modules.auth.dto.ResetPasswordRequest;
import com.team29.kindergarten.modules.auth.service.AuthService;
import com.team29.kindergarten.modules.auth.service.PasswordResetService;
import com.team29.kindergarten.modules.user.entity.User;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Auth", description = "Authentication and authorization API")
public class AuthController {

    private final AuthService authService;
    private final PasswordResetService passwordResetService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(Map.of("token", response.token()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok(Map.of("status", "success"));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {
        passwordResetService.requestReset(request.email());
        // Always return the same response, whether or not the email exists.
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "If an account exists for that email, a reset link has been sent."
        ));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {
        passwordResetService.resetPassword(request.token(), request.newPassword());
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "Password has been reset successfully."
        ));
    }
}