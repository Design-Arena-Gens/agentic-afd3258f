package com.cakeshop.dto;

import com.cakeshop.entity.Role;

public record UserSummary(
        Long id,
        String email,
        String firstName,
        String lastName,
        Role role
) {
}

