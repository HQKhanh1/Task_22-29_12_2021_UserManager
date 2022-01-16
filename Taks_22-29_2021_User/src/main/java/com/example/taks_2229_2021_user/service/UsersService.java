package com.example.taks_2229_2021_user.service;

import com.example.taks_2229_2021_user.exception.MailException;
import com.example.taks_2229_2021_user.exception.UsernameException;
import com.example.taks_2229_2021_user.exception.UsernameExitException;
import com.example.taks_2229_2021_user.model.Users;
import com.example.taks_2229_2021_user.payload.UserDto;
import com.example.taks_2229_2021_user.payload.UserResponse;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface UsersService {
    UserDto createUserMap(UserDto userDto);
    UserResponse getAllUsersPage(int pageNo, int pageSize, String sortBy, String sortDir);
    Users getUserByUserName(String name) throws UsernameException;
    List<Users> getAllUsers();
    List<Users> getAllVaccineDTONotPagination();
    Users createUser(Users users) throws UsernameExitException, MailException;
    Users updateUser(String userName, Users users) throws UsernameException;
    Users deleteUser(String name) throws UsernameException;
    Users checkMailForgotPass(String email);
    Boolean checkPassword(String password, String username) throws UsernameException;
    Boolean changePassword(String password, String username) throws UsernameException, JsonProcessingException;
    Boolean changePassUserThenForgotPas(Users users);
}
