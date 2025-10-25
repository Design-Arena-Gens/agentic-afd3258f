package com.cakeshop.repository;

import com.cakeshop.entity.CakeReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CakeReviewRepository extends JpaRepository<CakeReview, Long> {
}

