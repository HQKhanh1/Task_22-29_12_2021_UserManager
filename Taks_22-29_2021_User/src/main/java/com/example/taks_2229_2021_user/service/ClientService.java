package com.example.taks_2229_2021_user.service;


import com.example.taks_2229_2021_user.model.Users;

public interface ClientService {
    Boolean signup(Users sdi);
    Boolean create(Users sdi, String password);
    void forgotPassword(Users sdi, String password);
}
