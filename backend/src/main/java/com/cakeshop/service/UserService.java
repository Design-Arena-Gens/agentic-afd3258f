package com.cakeshop.service;

import com.cakeshop.dto.AddressDto;
import com.cakeshop.dto.PasswordChangeRequest;
import com.cakeshop.dto.PasswordResetRequest;
import com.cakeshop.dto.ProfileUpdateRequest;
import com.cakeshop.dto.UserSummary;
import com.cakeshop.entity.Address;
import com.cakeshop.entity.User;
import com.cakeshop.repository.AddressRepository;
import com.cakeshop.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;
    private final Map<String, String> resetTokens = new ConcurrentHashMap<>();

    public UserService(UserRepository userRepository,
                       AddressRepository addressRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public UserSummary getSummary(String email) {
        User user = getByEmail(email);
        return new UserSummary(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole()
        );
    }

    @Transactional
    public UserSummary updateProfile(String email, ProfileUpdateRequest request) {
        User user = getByEmail(email);
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        userRepository.save(user);
        return getSummary(email);
    }

    public List<AddressDto> listAddresses(String email) {
        User user = getByEmail(email);
        return addressRepository.findAllByUser(user).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public AddressDto addAddress(String email, AddressDto dto) {
        User user = getByEmail(email);
        Address address = Address.builder()
                .user(user)
                .line1(dto.line1())
                .line2(dto.line2())
                .city(dto.city())
                .state(dto.state())
                .postalCode(dto.postalCode())
                .country(dto.country())
                .defaultAddress(dto.defaultAddress())
                .build();
        Address saved = addressRepository.save(address);
        return toDto(saved);
    }

    @Transactional
    public AddressDto updateAddress(String email, Long addressId, AddressDto dto) {
        User user = getByEmail(email);
        Address address = addressRepository.findById(addressId)
                .filter(a -> a.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new IllegalArgumentException("Address not found"));
        address.setLine1(dto.line1());
        address.setLine2(dto.line2());
        address.setCity(dto.city());
        address.setState(dto.state());
        address.setPostalCode(dto.postalCode());
        address.setCountry(dto.country());
        address.setDefaultAddress(dto.defaultAddress());
        return toDto(addressRepository.save(address));
    }

    public void deleteAddress(String email, Long addressId) {
        User user = getByEmail(email);
        Address address = addressRepository.findById(addressId)
                .filter(a -> a.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new IllegalArgumentException("Address not found"));
        addressRepository.delete(address);
    }

    public String requestPasswordReset(PasswordResetRequest request) {
        User user = getByEmail(request.email());
        String token = UUID.randomUUID().toString();
        resetTokens.put(token, user.getEmail());
        return token;
    }

    @Transactional
    public void resetPassword(PasswordChangeRequest request) {
        String email = resetTokens.get(request.token());
        if (email == null) {
            throw new IllegalArgumentException("Invalid or expired token");
        }
        userRepository.findByEmail(email).ifPresent(user -> {
            user.setPassword(passwordEncoder.encode(request.newPassword()));
            userRepository.save(user);
            resetTokens.remove(request.token());
        });
    }

    private AddressDto toDto(Address address) {
        return new AddressDto(
                address.getId(),
                address.getLine1(),
                address.getLine2(),
                address.getCity(),
                address.getState(),
                address.getPostalCode(),
                address.getCountry(),
                address.isDefaultAddress()
        );
    }
}
