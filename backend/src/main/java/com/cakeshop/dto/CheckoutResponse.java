package com.cakeshop.dto;

import java.math.BigDecimal;

public record CheckoutResponse(
        String clientSecret,
        BigDecimal subtotal,
        BigDecimal shipping,
        BigDecimal total,
        String estimatedDelivery
) {
}

