package com.cakeshop.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Set;

public record CakeResponse(
        Long id,
        String name,
        String description,
        BigDecimal price,
        String flavor,
        String occasion,
        String dietaryRestrictions,
        boolean featured,
        Instant createdAt,
        Set<String> sizes,
        Set<String> frostingOptions,
        List<CakeImage> images,
        List<ReviewSummary> reviews,
        double averageRating
) {
    public record CakeImage(
            Long id,
            String url,
            boolean primaryImage
    ) {
    }

    public record ReviewSummary(
            Long id,
            String reviewer,
            String comment,
            int rating,
            Instant createdAt
    ) {
    }
}

