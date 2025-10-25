package com.cakeshop.service;

import com.cakeshop.dto.TestimonialRequest;
import com.cakeshop.entity.Testimonial;
import com.cakeshop.repository.TestimonialRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContentService {

    private final TestimonialRepository testimonialRepository;

    public ContentService(TestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }

    public List<Testimonial> listTestimonials() {
        return testimonialRepository.findAll();
    }

    @Transactional
    public Testimonial createTestimonial(TestimonialRequest request) {
        Testimonial testimonial = Testimonial.builder()
                .customerName(request.customerName())
                .message(request.message())
                .rating(request.rating())
                .build();
        return testimonialRepository.save(testimonial);
    }

    public void deleteTestimonial(Long id) {
        testimonialRepository.deleteById(id);
    }

    public List<String> getHeroHighlights() {
        return List.of(
                "Handcrafted cakes designed with love",
                "Premium ingredients sourced locally",
                "Custom messages & dietary options available"
        );
    }

    public List<String> getOccasions() {
        return List.of("Birthday", "Wedding", "Anniversary", "Graduation", "Baby Shower");
    }
}

