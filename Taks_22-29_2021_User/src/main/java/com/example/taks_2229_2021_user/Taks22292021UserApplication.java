package com.example.taks_2229_2021_user;

import com.example.taks_2229_2021_user.config.UserAuditorAware;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class Taks22292021UserApplication {
    @Bean
    public AuditorAware<String> auditorAware(){
        return new UserAuditorAware();
    }
    public static void main(String[] args) {
        SpringApplication.run(Taks22292021UserApplication.class, args);
    }

}
