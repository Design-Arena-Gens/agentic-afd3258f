package com.cakeshop.service;

import com.cakeshop.dto.AuthRequest;
import com.cakeshop.dto.AuthResponse;
import com.cakeshop.dto.RegisterRequest;
import com.cakeshop.dto.UserSummary;
import com.cakeshop.entity.Role;
import com.cakeshop.entity.User;
import com.cakeshop.repository.UserRepository;
import com.cakeshop.security.JwtService;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = User.builder()
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .firstName(request.firstName())
                .lastName(request.lastName())
                .enabled(true)
                .role(Role.CUSTOMER)
                .createdAt(Instant.now())
                .build();
        userRepository.save(user);

        UserSummary summary = new UserSummary(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole()
        );

        String token = jwtService.generateToken(Map.of("role", user.getRole().name()),
                new org.springframework.security.core.userdetails.User(
                        user.getEmail(),
                        user.getPassword(),
                        java.util.List.of(() -> "ROLE_" + user.getRole().name())
                ));
        return new AuthResponse(token, summary);
    }

    public AuthResponse authenticate(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        String token = jwtService.generateToken(Map.of("role", user.getRole().name()),
                (org.springframework.security.core.userdetails.User) authentication.getPrincipal());

        UserSummary summary = new UserSummary(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole()
        );

        return new AuthResponse(token, summary);
    }
}

