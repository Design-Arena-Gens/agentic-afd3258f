package com.cakeshop.service;

import com.cakeshop.dto.CakeFilter;
import com.cakeshop.dto.CakeRequest;
import com.cakeshop.dto.CakeResponse;
import com.cakeshop.entity.Cake;
import com.cakeshop.entity.CakeImage;
import com.cakeshop.entity.CakeReview;
import com.cakeshop.repository.CakeRepository;
import jakarta.persistence.criteria.JoinType;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CakeService {

    private final CakeRepository cakeRepository;

    public CakeService(CakeRepository cakeRepository) {
        this.cakeRepository = cakeRepository;
    }

    public List<CakeResponse> listCakes(CakeFilter filter) {
        Specification<Cake> specification = buildSpecification(filter);
        List<Cake> cakes = specification == null ? cakeRepository.findAll() : cakeRepository.findAll(specification);

        Comparator<Cake> comparator = Comparator.comparing(Cake::getCreatedAt).reversed();
        if (filter != null && filter.sort() != null) {
            switch (filter.sort()) {
                case "price_asc" -> comparator = Comparator.comparing(Cake::getPrice);
                case "price_desc" -> comparator = Comparator.comparing(Cake::getPrice).reversed();
                case "rating_desc" -> comparator = Comparator.comparingDouble(this::calculateAverageRating).reversed();
                default -> comparator = Comparator.comparing(Cake::getCreatedAt).reversed();
            }
        }

        return cakes.stream()
                .sorted(comparator)
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public CakeResponse getCake(Long id) {
        Cake cake = cakeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cake not found"));
        return toResponse(cake);
    }

    @Transactional
    public CakeResponse createCake(CakeRequest request) {
        Cake cake = new Cake();
        applyRequest(cake, request);
        cake.setCreatedAt(Instant.now());
        Cake saved = cakeRepository.save(cake);
        return toResponse(saved);
    }

    @Transactional
    public CakeResponse updateCake(Long id, CakeRequest request) {
        Cake cake = cakeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cake not found"));
        cake.getImages().clear();
        applyRequest(cake, request);
        Cake saved = cakeRepository.save(cake);
        return toResponse(saved);
    }

    public void deleteCake(Long id) {
        cakeRepository.deleteById(id);
    }

    private void applyRequest(Cake cake, CakeRequest request) {
        cake.setName(request.name());
        cake.setDescription(request.description());
        cake.setPrice(request.price());
        cake.setFlavor(request.flavor());
        cake.setOccasion(request.occasion());
        cake.setDietaryRestrictions(request.dietaryRestrictions());
        cake.setFeatured(request.featured());
        cake.setSizes(request.sizes() != null ? request.sizes() : Set.of());
        cake.setFrostingOptions(request.frostingOptions() != null ? request.frostingOptions() : Set.of());

        if (request.images() != null) {
            List<CakeImage> images = request.images().stream()
                    .map(img -> CakeImage.builder()
                            .url(img.url())
                            .primaryImage(img.primaryImage())
                            .cake(cake)
                            .build())
                    .collect(Collectors.toList());
            cake.getImages().addAll(images);
        }
    }

    private CakeResponse toResponse(Cake cake) {
        List<CakeResponse.CakeImage> images = cake.getImages().stream()
                .map(img -> new CakeResponse.CakeImage(img.getId(), img.getUrl(), img.isPrimaryImage()))
                .collect(Collectors.toList());

        List<CakeResponse.ReviewSummary> reviews = cake.getReviews().stream()
                .map(review -> new CakeResponse.ReviewSummary(
                        review.getId(),
                        review.getUser() != null ? review.getUser().getFirstName() : "Anonymous",
                        review.getComment(),
                        review.getRating(),
                        review.getCreatedAt()
                ))
                .collect(Collectors.toList());

        double averageRating = calculateAverageRating(cake);

        return new CakeResponse(
                cake.getId(),
                cake.getName(),
                cake.getDescription(),
                cake.getPrice(),
                cake.getFlavor(),
                cake.getOccasion(),
                cake.getDietaryRestrictions(),
                cake.isFeatured(),
                cake.getCreatedAt(),
                cake.getSizes(),
                cake.getFrostingOptions(),
                images,
                reviews,
                averageRating
        );
    }

    private Specification<Cake> buildSpecification(CakeFilter filter) {
        if (filter == null) {
            return null;
        }

        Specification<Cake> specification = Specification.where(null);

        if (filter.flavor() != null && !filter.flavor().isBlank()) {
            specification = specification.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("flavor")), "%" + filter.flavor().toLowerCase() + "%"));
        }

        if (filter.occasion() != null && !filter.occasion().isBlank()) {
            specification = specification.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("occasion")), "%" + filter.occasion().toLowerCase() + "%"));
        }

        if (filter.minPrice() != null) {
            specification = specification.and((root, query, cb) ->
                    cb.greaterThanOrEqualTo(root.get("price"), filter.minPrice()));
        }

        if (filter.maxPrice() != null) {
            specification = specification.and((root, query, cb) ->
                    cb.lessThanOrEqualTo(root.get("price"), filter.maxPrice()));
        }

        if (filter.dietaryRestrictions() != null && !filter.dietaryRestrictions().isEmpty()) {
            specification = specification.and((root, query, cb) -> {
                query.distinct(true);
                var join = root.join("dietaryRestrictions", JoinType.LEFT);
                return join.in(filter.dietaryRestrictions());
            });
        }

        return specification;
    }

    private double calculateAverageRating(Cake cake) {
        List<CakeReview> reviews = cake.getReviews();
        if (reviews == null || reviews.isEmpty()) {
            return 0.0;
        }
        double sum = reviews.stream().mapToDouble(CakeReview::getRating).sum();
        return Math.round((sum / reviews.size()) * 10.0) / 10.0;
    }
}
