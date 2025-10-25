package com.cakeshop.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record OrderItemRequest(
        @NotNull
        Long cakeId,
        @Min(1)
        int quantity,
        String selectedSize,
        String frostingOption,
        String customMessage
) {
}

