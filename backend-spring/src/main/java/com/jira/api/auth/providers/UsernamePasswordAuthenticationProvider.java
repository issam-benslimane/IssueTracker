package com.jira.api.auth.providers;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;


public class UsernamePasswordAuthenticationProvider implements AuthenticationProvider {
    private final Log logger = LogFactory.getLog(this.getClass());
    private UserDetailsService service;
    private PasswordEncoder passwordEncoder;

    public UsernamePasswordAuthenticationProvider(UserDetailsService service, PasswordEncoder passwordEncoder) {
        this.service = service;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String principal = (String) authentication.getPrincipal();
        String password = (String) authentication.getCredentials();
        this.logger.info("Attempting to login with: " + principal + ":" + password);
        UserDetails user = service.loadUserByUsername(principal);
        if (!passwordEncoder.matches(password, user.getPassword())) throw new BadCredentialsException("Bad Credentials");
        return new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
