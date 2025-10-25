package com.cakeshop.dto;

import jakarta.validation.constraints.NotBlank;

public record ProfileUpdateRequest(
        @NotBlank
        String firstName,
        @NotBlank
        String lastName
) {
}

