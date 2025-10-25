package com.cakeshop.controller;

import com.cakeshop.dto.CakeFilter;
import com.cakeshop.dto.CakeResponse;
import com.cakeshop.service.CakeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/cakes")
public class CakeController {

    private final CakeService cakeService;

    public CakeController(CakeService cakeService) {
        this.cakeService = cakeService;
    }

    @GetMapping
    public ResponseEntity<List<CakeResponse>> listCakes(
            @RequestParam(required = false) String flavor,
            @RequestParam(required = false) String occasion,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Set<String> dietary,
            @RequestParam(required = false) String sort
    ) {
        CakeFilter filter = new CakeFilter(flavor, occasion, minPrice, maxPrice, dietary, sort);
        return ResponseEntity.ok(cakeService.listCakes(filter));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CakeResponse> getCake(@PathVariable Long id) {
        return ResponseEntity.ok(cakeService.getCake(id));
    }
}

