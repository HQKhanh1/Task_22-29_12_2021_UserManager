package com.example.taks_2229_2021_user.service;


import com.example.taks_2229_2021_user.model.Users;
import com.example.taks_2229_2021_user.payload.UserDto;

public interface ClientService {
    Boolean create(UserDto sdi);
    void forgotPassword(Users sdi, String password);
}
