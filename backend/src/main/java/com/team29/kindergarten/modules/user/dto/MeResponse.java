package com.team29.kindergarten.modules.user.dto;

import java.util.List;

public record MeResponse(
        Long id,
        String email,
        String fullName,
        Long tenantId,
        List<String> roles
) {}