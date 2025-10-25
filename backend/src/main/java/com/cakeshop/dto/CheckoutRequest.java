package com.cakeshop.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record CheckoutRequest(
        @NotBlank
        String customerName,
        @Email
        String email,
        @Valid
        AddressDto shippingAddress,
        @NotEmpty
        List<@Valid OrderItemRequest> items
) {
}

