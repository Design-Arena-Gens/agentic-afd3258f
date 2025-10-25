package com.cakeshop.repository;

import com.cakeshop.entity.Cake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CakeRepository extends JpaRepository<Cake, Long>, JpaSpecificationExecutor<Cake> {
}

