package com.cakeshop.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PasswordChangeRequest(
        @NotBlank
        String token,
        @Size(min = 8)
        String newPassword
) {
}

