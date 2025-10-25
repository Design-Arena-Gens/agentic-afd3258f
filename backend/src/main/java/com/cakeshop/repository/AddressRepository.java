package com.cakeshop.repository;

import com.cakeshop.entity.Address;
import com.cakeshop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAllByUser(User user);
}

