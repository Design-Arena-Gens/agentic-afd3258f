package com.cakeshop.dto;

public record AuthResponse(
        String token,
        UserSummary user
) {
}

