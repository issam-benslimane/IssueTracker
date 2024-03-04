package com.jira.api.auth.filters;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.jira.api.auth.services.JwtService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public class UsernamePasswordAuthenticationFilter extends OncePerRequestFilter {
    private AuthenticationManager authenticationManager;
    private SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();
    private JwtService jwtService;

    public UsernamePasswordAuthenticationFilter(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        JsonObject parsedData = requestBody(request);
        String email = parsedData.get("email").getAsString();
        String password = parsedData.get("password").getAsString();
        if (email == null || password == null) {
            filterChain.doFilter(request, response);
            return;
        }
        Authentication authRequest = new UsernamePasswordAuthenticationToken(email.trim(), password);
        try {
            Authentication authResult = authenticationManager.authenticate(authRequest);
            SecurityContext context = this.securityContextHolderStrategy.createEmptyContext();
            context.setAuthentication(authResult);
            this.securityContextHolderStrategy.setContext(context);
            String token = jwtService.generateToken(Map.of("principal", authResult.getName()));
            this.logger.info("Bearer token: " + token);
            response.setHeader("Authorization", "Bearer " + token);
        } catch (AuthenticationException e){
            this.logger.warn("Authentication failed: " + e.getMessage());
            this.securityContextHolderStrategy.clearContext();
        }
    }

    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return !request.getServletPath().equals("/api/login") || !request.getMethod().equals("POST");
    }

    private JsonObject requestBody(HttpServletRequest request){
        StringBuilder requestBody = new StringBuilder();
        JsonParser jsonParser = new JsonParser();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                requestBody.append(line);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return jsonParser.parse(requestBody.toString()).getAsJsonObject();
    }
}
