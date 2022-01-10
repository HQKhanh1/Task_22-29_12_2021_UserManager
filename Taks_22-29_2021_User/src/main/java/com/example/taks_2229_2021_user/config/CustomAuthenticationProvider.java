package com.example.taks_2229_2021_user.config;

import com.example.taks_2229_2021_user.model.Users;
import com.example.taks_2229_2021_user.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Service
@CrossOrigin(origins = "**")
public class CustomAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    private UsersRepository usersRepository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        Users users = usersRepository.findById(username).orElse(null);
        if (users != null) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String comparePassword = users.getPassword();
            if (passwordEncoder.matches(password, comparePassword)) {
                return new UsernamePasswordAuthenticationToken(username, password,
                        List.of(new SimpleGrantedAuthority(users.getRoleName())));
            }
        }
        return null;
    }

    @Override
    public boolean supports(Class<?> auth) {
        return auth.equals(UsernamePasswordAuthenticationToken.class);
    }


}
