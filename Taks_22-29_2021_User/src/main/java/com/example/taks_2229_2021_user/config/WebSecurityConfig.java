package com.example.taks_2229_2021_user.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private CustomAuthenticationProvider authProvider;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors();
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/user/signup").permitAll()
                .antMatchers("/", "/h2/**").permitAll()
                .antMatchers(HttpMethod.POST, "/user/sendmail").permitAll()
                .antMatchers(HttpMethod.POST, "/user/changePassForgot").permitAll()
                .antMatchers(HttpMethod.GET, "/user/checkemail/**").permitAll()
                .antMatchers(HttpMethod.GET, "/user/checkemail/**").permitAll()
                .antMatchers(HttpMethod.PUT,"/user/change/**").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/user/**").hasAnyRole("ROLE_ADMIN")
                .anyRequest().authenticated().and().httpBasic();
        ;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authProvider);
    }

    @Bean
    public RoleHierarchy roleHierarchy() {
        RoleHierarchyImpl r = new RoleHierarchyImpl();
        r.setHierarchy("ROLE_ADMIN >  ROLE_USER");
        return r;
    }
}
