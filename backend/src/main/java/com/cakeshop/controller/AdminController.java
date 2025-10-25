package com.cakeshop.controller;

import com.cakeshop.dto.CakeRequest;
import com.cakeshop.dto.CakeResponse;
import com.cakeshop.dto.OrderSummary;
import com.cakeshop.dto.UpdateOrderStatusRequest;
import com.cakeshop.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/cakes")
    public ResponseEntity<CakeResponse> createCake(@Valid @RequestBody CakeRequest request) {
        return ResponseEntity.ok(adminService.createCake(request));
    }

    @PutMapping("/cakes/{id}")
    public ResponseEntity<CakeResponse> updateCake(@PathVariable Long id,
                                                   @Valid @RequestBody CakeRequest request) {
        return ResponseEntity.ok(adminService.updateCake(id, request));
    }

    @DeleteMapping("/cakes/{id}")
    public ResponseEntity<Void> deleteCake(@PathVariable Long id) {
        adminService.deleteCake(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderSummary>> orders() {
        return ResponseEntity.ok(adminService.listOrders());
    }

    @PutMapping("/orders/{id}/status")
    public ResponseEntity<OrderSummary> updateOrderStatus(@PathVariable Long id,
                                                          @Valid @RequestBody UpdateOrderStatusRequest request) {
        return ResponseEntity.ok(adminService.updateOrderStatus(id, request.status()));
    }

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Object>> metrics() {
        return ResponseEntity.ok(adminService.getDashboardMetrics());
    }
}
