package com.team29.kindergarten.modules.auth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final String fromAddress;

    public EmailService(
            JavaMailSender mailSender,
            @Value("${app.mail.from}") String fromAddress
    ) {
        this.mailSender = mailSender;
        this.fromAddress = fromAddress;
    }

    public void sendPasswordResetEmail(String toEmail, String resetLink, long ttlMinutes) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromAddress);
        message.setTo(toEmail);
        message.setSubject("Reset your Kindergarten App password");
        message.setText(
                "Hello,\n\n"
                        + "We received a request to reset your password.\n\n"
                        + "Click the link below to set a new password:\n"
                        + resetLink + "\n\n"
                        + "This link will expire in " + ttlMinutes + " minutes.\n\n"
                        + "If you did not request this, you can safely ignore this email.\n\n"
                        + "Kindergarten App"
        );

        mailSender.send(message);
    }
}