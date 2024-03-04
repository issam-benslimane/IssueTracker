package com.jira.api.auth.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
public class JwtService {
    @Value("${jwt.signing.key}")
    private String signingKey;
    private Claims claims = null;

    public String generateToken(Map<String, ?> payload){
        SecretKey key = Keys.hmacShaKeyFor(signingKey.getBytes(StandardCharsets.UTF_8));
        return Jwts.builder()
                .setClaims(payload)
                .signWith(key)
                .compact();
    }

    public void parseToken(String token){
        SecretKey key = Keys.hmacShaKeyFor(signingKey.getBytes(StandardCharsets.UTF_8));
        claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Object get(String k){
        if (k == null) throw new RuntimeException("Please provide a key.");
        return claims.get(k);
    }
}
