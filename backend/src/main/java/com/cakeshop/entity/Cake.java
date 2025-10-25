package com.cakeshop.entity;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cakes")
public class Cake {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Lob
    private String description;

    private BigDecimal price;

    private String flavor;

    private String occasion;

    private String dietaryRestrictions;

    private boolean featured;

    private Instant createdAt;

    @OneToMany(mappedBy = "cake", fetch = FetchType.LAZY, cascade = jakarta.persistence.CascadeType.ALL, orphanRemoval = true)
    private List<CakeImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "cake", cascade = jakarta.persistence.CascadeType.ALL, orphanRemoval = true)
    private List<CakeReview> reviews = new ArrayList<>();

    @ElementCollection
    private Set<String> sizes;

    @ElementCollection
    private Set<String> frostingOptions;
}

