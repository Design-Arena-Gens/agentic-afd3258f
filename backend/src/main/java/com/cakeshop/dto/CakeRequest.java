package com.cakeshop.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

public record CakeRequest(
        @NotBlank
        String name,
        @NotBlank
        String description,
        @NotNull
        BigDecimal price,
        @NotBlank
        String flavor,
        String occasion,
        String dietaryRestrictions,
        boolean featured,
        Set<String> sizes,
        Set<String> frostingOptions,
        List<CakeImageRequest> images
) {
    public record CakeImageRequest(
            @NotBlank
            String url,
            boolean primaryImage
    ) {
    }
}

