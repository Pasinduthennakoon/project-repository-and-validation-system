package com.trinco.researchrepo.research_repo_backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
// 💡 New CORS Imports
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // 1. PasswordEncoder Bean (Keep this for hashing/verification logic)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 2. DEFINE THE CORS CONFIGURATION SOURCE BEAN
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // ⚠️ CRITICAL: Set your frontend URL here
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));

        // Allow necessary HTTP methods (OPTIONS is necessary for pre-flight)
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Allow all headers, including Authorization (for future JWT use)
        configuration.setAllowedHeaders(List.of("*"));

        // Allow cookies/credentials (good practice, especially for JWT in headers)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Apply this configuration to all paths
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // 3. Security Filter Chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // ⚠️ FIX 1: Integrate the CORS configuration into Spring Security
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // Disable CSRF protection for REST APIs.
                .csrf(csrf -> csrf.disable())

                // Disable default form login and basic HTTP auth.
                .httpBasic(httpBasic -> httpBasic.disable())
                .formLogin(formLogin -> formLogin.disable())

                // Set session management to stateless (standard for JWT APIs).
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Allow ALL requests to ALL URLs (as per your current requirement)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                );

        return http.build();
    }
}