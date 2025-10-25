package com.cakeshop.dto;

import java.math.BigDecimal;
import java.util.Set;

public record CakeFilter(
        String flavor,
        String occasion,
        BigDecimal minPrice,
        BigDecimal maxPrice,
        Set<String> dietaryRestrictions,
        String sort
) {
}

