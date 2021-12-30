package com.example.taks_2229_2021_user.service;

import com.example.taks_2229_2021_user.exception.ThrowException;
import com.example.taks_2229_2021_user.model.Users;
import com.example.taks_2229_2021_user.payload.UserDto;
import com.example.taks_2229_2021_user.payload.UserResponse;

import java.util.List;

public interface UsersService {
    UserDto createUser(UserDto userDto);
    UserResponse getAllUsersPage(int pageNo, int pageSize, String sortBy, String sortDir);
    Users getUserByUserName(String name) throws ThrowException;
    List<Users> getAllUsers();
    List<Users> getAllVaccineDTONotPagination();
    void createUser(Users users) throws ThrowException;
    void updateUser(String userName, Users users) throws ThrowException;
    void deleteUser(String name) throws ThrowException;
}
