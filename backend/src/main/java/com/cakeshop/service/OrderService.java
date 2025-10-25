package com.cakeshop.service;

import com.cakeshop.dto.AddressDto;
import com.cakeshop.dto.OrderItemRequest;
import com.cakeshop.dto.OrderRequest;
import com.cakeshop.dto.OrderSummary;
import com.cakeshop.entity.Address;
import com.cakeshop.entity.Cake;
import com.cakeshop.entity.Order;
import com.cakeshop.entity.OrderItem;
import com.cakeshop.entity.OrderStatus;
import com.cakeshop.entity.User;
import com.cakeshop.repository.CakeRepository;
import com.cakeshop.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CakeRepository cakeRepository;
    private final UserService userService;

    public OrderService(OrderRepository orderRepository,
                        CakeRepository cakeRepository,
                        UserService userService) {
        this.orderRepository = orderRepository;
        this.cakeRepository = cakeRepository;
        this.userService = userService;
    }

    @Transactional
    public OrderSummary placeOrder(String customerEmail, OrderRequest request) {
        User user = userService.getByEmail(customerEmail);
        Address shippingAddress = buildAddress(request.shippingAddress(), user);

        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(shippingAddress);
        order.setStatus(OrderStatus.PENDING);
        order.setCreatedAt(Instant.now());
        order.setUpdatedAt(Instant.now());
        order.setEstimatedDelivery(Instant.now().plus(5, ChronoUnit.DAYS));
        order.setSubtotal(BigDecimal.ZERO);
        order.setShippingCost(new BigDecimal("5.00"));
        order.setTotal(BigDecimal.ZERO);

        List<OrderItem> items = request.items().stream()
                .map(itemRequest -> buildOrderItem(order, itemRequest))
                .collect(Collectors.toList());

        BigDecimal subtotal = items.stream()
                .map(OrderItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        order.setItems(items);
        order.setSubtotal(subtotal);
        order.setTotal(subtotal.add(order.getShippingCost()));

        Order saved = orderRepository.save(order);

        return toSummary(saved);
    }

    public List<OrderSummary> getOrdersForUser(String email) {
        User user = userService.getByEmail(email);
        return orderRepository.findAllByUser(user).stream()
                .map(this::toSummary)
                .collect(Collectors.toList());
    }

    public List<OrderSummary> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::toSummary)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderSummary updateStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        order.setStatus(status);
        order.setUpdatedAt(Instant.now());
        return toSummary(orderRepository.save(order));
    }

    private OrderItem buildOrderItem(Order order, OrderItemRequest request) {
        Cake cake = cakeRepository.findById(request.cakeId())
                .orElseThrow(() -> new IllegalArgumentException("Cake not found"));

        BigDecimal quantity = BigDecimal.valueOf(request.quantity());
        BigDecimal total = cake.getPrice().multiply(quantity);

        return OrderItem.builder()
                .order(order)
                .cake(cake)
                .quantity(request.quantity())
                .selectedSize(request.selectedSize())
                .frostingOption(request.frostingOption())
                .customMessage(request.customMessage())
                .unitPrice(cake.getPrice())
                .totalPrice(total)
                .build();
    }

    private Address buildAddress(AddressDto dto, User user) {
        Address address = Address.builder()
                .user(user)
                .line1(dto.line1())
                .line2(dto.line2())
                .city(dto.city())
                .state(dto.state())
                .postalCode(dto.postalCode())
                .country(dto.country())
                .defaultAddress(dto.defaultAddress())
                .build();
        user.getAddresses().add(address);
        return address;
    }

    private OrderSummary toSummary(Order order) {
        return new OrderSummary(
                order.getId(),
                order.getCreatedAt(),
                order.getEstimatedDelivery(),
                order.getStatus(),
                order.getTotal(),
                order.getItems().stream()
                        .map(item -> new OrderSummary.OrderItemSummary(
                                item.getCake().getId(),
                                item.getCake().getName(),
                                item.getQuantity(),
                                item.getSelectedSize(),
                                item.getFrostingOption(),
                                item.getCustomMessage(),
                                item.getUnitPrice(),
                                item.getTotalPrice()
                        ))
                        .collect(Collectors.toList())
        );
    }
}

