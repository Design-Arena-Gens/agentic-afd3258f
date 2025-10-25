package com.cakeshop.service;

import com.cakeshop.dto.CheckoutRequest;
import com.cakeshop.dto.CheckoutResponse;
import com.cakeshop.dto.OrderItemRequest;
import com.cakeshop.entity.Cake;
import com.cakeshop.repository.CakeRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CheckoutService {

    private final CakeRepository cakeRepository;
    private final String stripeApiKey;

    public CheckoutService(CakeRepository cakeRepository, @Value("${stripe.apiKey}") String stripeApiKey) {
        this.cakeRepository = cakeRepository;
        this.stripeApiKey = stripeApiKey;
    }

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    public CheckoutResponse createPaymentIntent(CheckoutRequest request) {
        List<OrderItemRequest> items = request.items();

        BigDecimal subtotal = items.stream()
                .map(item -> {
                    Cake cake = cakeRepository.findById(item.cakeId())
                            .orElseThrow(() -> new IllegalArgumentException("Cake not found"));
                    return cake.getPrice().multiply(BigDecimal.valueOf(item.quantity()));
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal shipping = new BigDecimal("5.00");
        BigDecimal total = subtotal.add(shipping);
        long amountInCents = total.multiply(BigDecimal.valueOf(100)).setScale(0, RoundingMode.HALF_UP).longValue();

        Map<String, Object> params = new HashMap<>();
        params.put("amount", amountInCents);
        params.put("currency", "usd");
        params.put("description", "Cake Shop Order");
        Map<String, Object> shippingDetails = new HashMap<>();
        shippingDetails.put("name", request.customerName());
        Map<String, Object> address = new HashMap<>();
        address.put("line1", request.shippingAddress().line1());
        address.put("line2", request.shippingAddress().line2());
        address.put("city", request.shippingAddress().city());
        address.put("state", request.shippingAddress().state());
        address.put("postal_code", request.shippingAddress().postalCode());
        address.put("country", request.shippingAddress().country());
        shippingDetails.put("address", address);
        params.put("shipping", shippingDetails);

        try {
            PaymentIntent intent = PaymentIntent.create(params);
            Instant estimatedDelivery = Instant.now().plus(5, ChronoUnit.DAYS);
            return new CheckoutResponse(
                    intent.getClientSecret(),
                    subtotal,
                    shipping,
                    total,
                    estimatedDelivery.toString()
            );
        } catch (StripeException e) {
            throw new IllegalStateException("Unable to create payment intent", e);
        }
    }
}

