package com.team29.kindergarten.modules.auth.service;

import com.resend.Resend;
import com.resend.services.emails.model.CreateEmailOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final Resend resend;
    private final String fromAddress;

    public EmailService(
            @Value("${app.resend.api-key}") String apiKey,
            @Value("${app.mail.from}") String fromAddress
    ) {
        this.resend = new Resend(apiKey);
        this.fromAddress = fromAddress;
    }

    public void sendPasswordResetEmail(String toEmail, String resetLink, long ttlMinutes) {
        CreateEmailOptions params = CreateEmailOptions.builder()
                .from(fromAddress)
                .to(toEmail)
                .subject("Reset your Kindergarten App password")
                .text(
                        "Hello,\n\n"
                                + "We received a request to reset your password.\n\n"
                                + "Click the link below to set a new password:\n"
                                + resetLink + "\n\n"
                                + "This link will expire in " + ttlMinutes + " minutes.\n\n"
                                + "If you did not request this, you can safely ignore this email.\n\n"
                                + "Kindergarten App"
                )
                .build();

        try {
            resend.emails().send(params);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send password reset email", e);
        }
    }
}