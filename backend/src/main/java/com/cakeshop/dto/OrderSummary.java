package com.cakeshop.dto;

import com.cakeshop.entity.OrderStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderSummary(
        Long id,
        Instant createdAt,
        Instant estimatedDelivery,
        OrderStatus status,
        BigDecimal total,
        List<OrderItemSummary> items
) {
    public record OrderItemSummary(
            Long cakeId,
            String cakeName,
            int quantity,
            String selectedSize,
            String frostingOption,
            String customMessage,
            BigDecimal unitPrice,
            BigDecimal totalPrice
    ) {
    }
}

