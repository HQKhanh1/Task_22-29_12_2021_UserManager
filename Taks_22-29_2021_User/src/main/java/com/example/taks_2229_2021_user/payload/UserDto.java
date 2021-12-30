package com.example.taks_2229_2021_user.payload;

import lombok.Data;

@Data
public class UserDto {
    private String username;
    private String password;
    private String firstname;
    private String lastname;
    private String email;
}
