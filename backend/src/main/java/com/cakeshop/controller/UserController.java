package com.cakeshop.controller;

import com.cakeshop.dto.AddressDto;
import com.cakeshop.dto.PasswordChangeRequest;
import com.cakeshop.dto.PasswordResetRequest;
import com.cakeshop.dto.ProfileUpdateRequest;
import com.cakeshop.dto.UserSummary;
import com.cakeshop.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserSummary> profile(Authentication authentication) {
        return ResponseEntity.ok(userService.getSummary(authentication.getName()));
    }

    @PutMapping("/me")
    public ResponseEntity<UserSummary> updateProfile(Authentication authentication,
                                                     @Valid @RequestBody ProfileUpdateRequest request) {
        return ResponseEntity.ok(userService.updateProfile(authentication.getName(), request));
    }

    @GetMapping("/me/addresses")
    public ResponseEntity<List<AddressDto>> listAddresses(Authentication authentication) {
        return ResponseEntity.ok(userService.listAddresses(authentication.getName()));
    }

    @PostMapping("/me/addresses")
    public ResponseEntity<AddressDto> addAddress(Authentication authentication,
                                                 @Valid @RequestBody AddressDto dto) {
        return ResponseEntity.ok(userService.addAddress(authentication.getName(), dto));
    }

    @PutMapping("/me/addresses/{id}")
    public ResponseEntity<AddressDto> updateAddress(Authentication authentication,
                                                    @PathVariable Long id,
                                                    @Valid @RequestBody AddressDto dto) {
        return ResponseEntity.ok(userService.updateAddress(authentication.getName(), id, dto));
    }

    @DeleteMapping("/me/addresses/{id}")
    public ResponseEntity<Void> deleteAddress(Authentication authentication, @PathVariable Long id) {
        userService.deleteAddress(authentication.getName(), id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/password/reset")
    public ResponseEntity<String> requestPasswordReset(@Valid @RequestBody PasswordResetRequest request) {
        return ResponseEntity.ok(userService.requestPasswordReset(request));
    }

    @PostMapping("/password/change")
    public ResponseEntity<Void> changePassword(@Valid @RequestBody PasswordChangeRequest request) {
        userService.resetPassword(request);
        return ResponseEntity.ok().build();
    }
}

