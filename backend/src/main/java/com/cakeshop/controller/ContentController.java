package com.cakeshop.controller;

import com.cakeshop.dto.TestimonialRequest;
import com.cakeshop.entity.Testimonial;
import com.cakeshop.service.ContentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/content")
public class ContentController {

    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("/hero")
    public ResponseEntity<Map<String, Object>> heroContent() {
        Map<String, Object> response = new HashMap<>();
        response.put("highlights", contentService.getHeroHighlights());
        response.put("occasions", contentService.getOccasions());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/testimonials")
    public ResponseEntity<List<Testimonial>> testimonials() {
        return ResponseEntity.ok(contentService.listTestimonials());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/testimonials")
    public ResponseEntity<Testimonial> createTestimonial(@Valid @RequestBody TestimonialRequest request) {
        return ResponseEntity.ok(contentService.createTestimonial(request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/testimonials/{id}")
    public ResponseEntity<Void> deleteTestimonial(@PathVariable Long id) {
        contentService.deleteTestimonial(id);
        return ResponseEntity.noContent().build();
    }
}

