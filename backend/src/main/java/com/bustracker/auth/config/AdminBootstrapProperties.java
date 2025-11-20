package com.bustracker.auth.config;

import com.bustracker.auth.model.UserRole;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "bootstrap.admin")
public record AdminBootstrapProperties(
        String username,
        String password,
        UserRole role
) {
}

