package com.jira.api.auth.filters;

import com.jira.api.auth.core.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Map;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private AuthenticationManager authenticationManager;
    private SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();
    private JwtService jwtService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = extractToken(request);
        if (token == null){
            filterChain.doFilter(request, response);
            return;
        }
        this.logger.info("Token provided: " + token);
        Map<String, Object> claims = jwtService.parseToken(token);
        String principal = String.valueOf(claims.get("principal"));
        this.logger.info("Trying to authenticate with: " + principal);
        Authentication authRequest = new UsernamePasswordAuthenticationToken(principal, null);
        try {
            Authentication authResult = authenticationManager.authenticate(authRequest);
            this.logger.info("Principal found with roles: " + authResult.getAuthorities());
            SecurityContext context = this.securityContextHolderStrategy.createEmptyContext();
            context.setAuthentication(authResult);
            this.securityContextHolderStrategy.setContext(context);
        } catch (AuthenticationException e){
            this.securityContextHolderStrategy.clearContext();
        }
    }

    private String extractToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null){
            if (header.startsWith("Bearer")){
                return header.replace("Bearer ", "");
            }
        }
        return null;
    }
}
