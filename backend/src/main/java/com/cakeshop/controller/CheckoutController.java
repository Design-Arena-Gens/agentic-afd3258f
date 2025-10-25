package com.cakeshop.controller;

import com.cakeshop.dto.CheckoutRequest;
import com.cakeshop.dto.CheckoutResponse;
import com.cakeshop.service.CheckoutService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private final CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<CheckoutResponse> createPaymentIntent(@Valid @RequestBody CheckoutRequest request) {
        return ResponseEntity.ok(checkoutService.createPaymentIntent(request));
    }
}

