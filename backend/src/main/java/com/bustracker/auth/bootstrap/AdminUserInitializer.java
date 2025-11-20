package com.bustracker.auth.bootstrap;

import com.bustracker.auth.config.AdminBootstrapProperties;
import com.bustracker.auth.model.UserAccount;
import com.bustracker.auth.repository.UserAccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class AdminUserInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminUserInitializer.class);

    private final UserAccountRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final AdminBootstrapProperties properties;

    public AdminUserInitializer(
            UserAccountRepository repository,
            PasswordEncoder passwordEncoder,
            AdminBootstrapProperties properties
    ) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.properties = properties;
    }

    @Override
    public void run(String... args) {
        if (properties == null
                || !StringUtils.hasText(properties.username())
                || !StringUtils.hasText(properties.password())) {
            log.warn("Bootstrap admin user skipped - username/password not configured");
            return;
        }

        repository.findByUsernameIgnoreCase(properties.username())
                .ifPresentOrElse(this::ensurePasswordUpToDate, this::createAdminUser);
    }

    private void createAdminUser() {
        UserAccount admin = new UserAccount(
                properties.username(),
                passwordEncoder.encode(properties.password()),
                properties.role()
        );
        repository.save(admin);
        log.info("Bootstrap admin user '{}' created", admin.getUsername());
    }

    private void ensurePasswordUpToDate(UserAccount existing) {
        boolean needsUpdate = !passwordEncoder.matches(properties.password(), existing.getPasswordHash());
        boolean roleChanged = existing.getRole() != properties.role();
        boolean statusChanged = !existing.isActive();

        if (!needsUpdate && !roleChanged && !statusChanged) {
            return;
        }

        if (needsUpdate) {
            existing.setPasswordHash(passwordEncoder.encode(properties.password()));
        }
        if (roleChanged) {
            existing.setRole(properties.role());
        }
        if (statusChanged) {
            existing.setActive(true);
        }

        repository.save(existing);
        log.info("Bootstrap admin user '{}' updated", existing.getUsername());
    }
}

