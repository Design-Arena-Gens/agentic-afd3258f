package com.cakeshop.dto;

import com.cakeshop.entity.OrderStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateOrderStatusRequest(
        @NotNull
        OrderStatus status
) {
}

