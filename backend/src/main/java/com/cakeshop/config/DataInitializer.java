package com.cakeshop.config;

import com.cakeshop.entity.Cake;
import com.cakeshop.entity.CakeImage;
import com.cakeshop.entity.Role;
import com.cakeshop.entity.Testimonial;
import com.cakeshop.entity.User;
import com.cakeshop.repository.CakeRepository;
import com.cakeshop.repository.TestimonialRepository;
import com.cakeshop.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner loadData(UserRepository userRepository,
                                      PasswordEncoder passwordEncoder,
                                      CakeRepository cakeRepository,
                                      TestimonialRepository testimonialRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                User admin = User.builder()
                        .email("admin@cakeshop.com")
                        .password(passwordEncoder.encode("adminpass"))
                        .firstName("Ava")
                        .lastName("Baker")
                        .enabled(true)
                        .role(Role.ADMIN)
                        .createdAt(Instant.now())
                        .build();
                User customer = User.builder()
                        .email("customer@cakeshop.com")
                        .password(passwordEncoder.encode("customerpass"))
                        .firstName("Liam")
                        .lastName("Sweet")
                        .enabled(true)
                        .role(Role.CUSTOMER)
                        .createdAt(Instant.now())
                        .build();
                userRepository.saveAll(List.of(admin, customer));
            }

            if (cakeRepository.count() == 0) {
                Cake velvet = Cake.builder()
                        .name("Velvet Dream")
                        .description("Decadent red velvet layered cake with cream cheese frosting and raspberry glaze.")
                        .price(new BigDecimal("59.99"))
                        .flavor("Red Velvet")
                        .occasion("Wedding")
                        .dietaryRestrictions("Contains dairy, gluten")
                        .featured(true)
                        .createdAt(Instant.now())
                        .sizes(Set.of("6 inch", "8 inch", "10 inch"))
                        .frostingOptions(Set.of("Cream Cheese", "Buttercream"))
                        .build();
                CakeImage velvetImg1 = CakeImage.builder()
                        .cake(velvet)
                        .url("https://images.unsplash.com/photo-1605807646983-377bc5a76493")
                        .primaryImage(true)
                        .build();
                velvet.setImages(List.of(velvetImg1));

                Cake citrus = Cake.builder()
                        .name("Citrus Sunrise")
                        .description("Zesty lemon sponge with passionfruit curd and whipped mascarpone.")
                        .price(new BigDecimal("49.99"))
                        .flavor("Lemon")
                        .occasion("Birthday")
                        .dietaryRestrictions("Contains dairy, gluten")
                        .featured(true)
                        .createdAt(Instant.now())
                        .sizes(Set.of("6 inch", "9 inch"))
                        .frostingOptions(Set.of("Lemon Buttercream", "Vanilla Buttercream"))
                        .build();
                CakeImage citrusImg = CakeImage.builder()
                        .cake(citrus)
                        .url("https://images.unsplash.com/photo-1514516430032-7f41ce80f7ee")
                        .primaryImage(true)
                        .build();
                citrus.setImages(List.of(citrusImg));

                Cake chocolate = Cake.builder()
                        .name("Midnight Ganache")
                        .description("Rich chocolate cake layered with dark chocolate ganache and gold dust.")
                        .price(new BigDecimal("64.99"))
                        .flavor("Chocolate")
                        .occasion("Anniversary")
                        .dietaryRestrictions("Contains dairy, gluten")
                        .featured(false)
                        .createdAt(Instant.now())
                        .sizes(Set.of("8 inch", "10 inch"))
                        .frostingOptions(Set.of("Dark Chocolate", "Salted Caramel"))
                        .build();
                CakeImage chocolateImg = CakeImage.builder()
                        .cake(chocolate)
                        .url("https://images.unsplash.com/photo-1505253716362-afaea1d3d1af")
                        .primaryImage(true)
                        .build();
                chocolate.setImages(List.of(chocolateImg));

                cakeRepository.saveAll(List.of(velvet, citrus, chocolate));
            }

            if (testimonialRepository.count() == 0) {
                testimonialRepository.saveAll(List.of(
                        Testimonial.builder()
                                .customerName("Sophia M.")
                                .message("The Velvet Dream cake made our wedding unforgettable! Stunning design and incredible flavor.")
                                .rating(5)
                                .build(),
                        Testimonial.builder()
                                .customerName("Jackson H.")
                                .message("Beautiful presentation and the lemon flavors were so refreshing. Highly recommend!")
                                .rating(4)
                                .build(),
                        Testimonial.builder()
                                .customerName("Emily R.")
                                .message("Midnight Ganache is a chocolate lover's dream. Rich, moist, and perfectly balanced.")
                                .rating(5)
                                .build()
                ));
            }
        };
    }
}

