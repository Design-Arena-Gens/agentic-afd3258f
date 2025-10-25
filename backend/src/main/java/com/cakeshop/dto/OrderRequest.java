package com.cakeshop.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record OrderRequest(
        @Valid
        AddressDto shippingAddress,
        @NotEmpty
        List<@Valid OrderItemRequest> items,
        @NotNull
        String paymentMethodId
) {
}

