package com.cakeshop.service;

import com.cakeshop.dto.CakeRequest;
import com.cakeshop.dto.CakeResponse;
import com.cakeshop.dto.OrderSummary;
import com.cakeshop.entity.Order;
import com.cakeshop.entity.OrderStatus;
import com.cakeshop.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final CakeService cakeService;
    private final OrderService orderService;
    private final OrderRepository orderRepository;

    public AdminService(CakeService cakeService,
                        OrderService orderService,
                        OrderRepository orderRepository) {
        this.cakeService = cakeService;
        this.orderService = orderService;
        this.orderRepository = orderRepository;
    }

    public CakeResponse createCake(CakeRequest request) {
        return cakeService.createCake(request);
    }

    public CakeResponse updateCake(Long cakeId, CakeRequest request) {
        return cakeService.updateCake(cakeId, request);
    }

    public void deleteCake(Long cakeId) {
        cakeService.deleteCake(cakeId);
    }

    public List<OrderSummary> listOrders() {
        return orderService.getAllOrders();
    }

    public Map<String, Object> getDashboardMetrics() {
        List<Order> orders = orderRepository.findAll();
        BigDecimal totalRevenue = orders.stream()
                .map(Order::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long openOrders = orders.stream()
                .filter(order -> order.getStatus() == OrderStatus.PENDING || order.getStatus() == OrderStatus.PROCESSING)
                .count();

        Map<String, Long> ordersByStatus = orders.stream()
                .collect(Collectors.groupingBy(order -> order.getStatus().name(), Collectors.counting()));

        Map<String, BigDecimal> revenueByMonth = orders.stream()
                .collect(Collectors.groupingBy(
                        order -> formatMonth(order.getCreatedAt()),
                        Collectors.mapping(Order::getTotal, Collectors.reducing(BigDecimal.ZERO, BigDecimal::add))
                ));

        Map<String, Object> response = new HashMap<>();
        response.put("totalRevenue", totalRevenue);
        response.put("openOrders", openOrders);
        response.put("ordersByStatus", ordersByStatus);
        response.put("revenueByMonth", revenueByMonth);
        return response;
    }

    public OrderSummary updateOrderStatus(Long orderId, OrderStatus status) {
        return orderService.updateStatus(orderId, status);
    }

    private String formatMonth(Instant instant) {
        if (instant == null) {
            return "Unknown";
        }
        return DateTimeFormatter.ofPattern("MMM yyyy")
                .withZone(ZoneId.systemDefault())
                .format(instant);
    }
}
