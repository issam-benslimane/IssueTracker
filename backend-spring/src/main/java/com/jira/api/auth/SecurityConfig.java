package com.jira.api.auth;

import com.jira.api.auth.filters.JwtAuthenticationFilter;
import com.jira.api.auth.filters.UsernamePasswordAuthenticationFilter;
import com.jira.api.auth.providers.JwtAuthenticationProvider;
import com.jira.api.auth.providers.UsernamePasswordAuthenticationProvider;
import com.jira.api.auth.core.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private JwtService jwtService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationManager manager) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable);
        http.addFilterBefore(new JwtAuthenticationFilter(manager, jwtService), AuthorizationFilter.class)
            .addFilterAfter(new UsernamePasswordAuthenticationFilter(manager, jwtService), JwtAuthenticationFilter.class);
        http.authorizeHttpRequests(registry -> registry
                .requestMatchers(HttpMethod.POST, "/api/users").permitAll()
                .anyRequest().authenticated());

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder) {
        AuthenticationProvider[] providers = {new JwtAuthenticationProvider(userDetailsService), new UsernamePasswordAuthenticationProvider(userDetailsService, passwordEncoder)};
        return new ProviderManager(providers);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
