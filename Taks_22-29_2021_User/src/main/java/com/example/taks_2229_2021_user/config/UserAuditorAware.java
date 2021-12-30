package com.example.taks_2229_2021_user.config;

import org.springframework.data.domain.AuditorAware;

import java.util.Optional;

public class UserAuditorAware implements AuditorAware<String> {
    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.of("Huynh Quoc Khanh").filter(s->true);
    }
}
