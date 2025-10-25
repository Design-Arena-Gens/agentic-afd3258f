package com.cakeshop.repository;

import com.cakeshop.entity.Order;
import com.cakeshop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByUser(User user);
}

