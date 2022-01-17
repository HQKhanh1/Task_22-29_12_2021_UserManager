package com.example.taks_2229_2021_user.service.impl;

import com.example.taks_2229_2021_user.exception.MailException;
import com.example.taks_2229_2021_user.exception.UsernameException;
import com.example.taks_2229_2021_user.exception.UsernameExitException;
import com.example.taks_2229_2021_user.model.Users;
import com.example.taks_2229_2021_user.payload.UserDto;
import com.example.taks_2229_2021_user.payload.UserResponse;
import com.example.taks_2229_2021_user.repository.UsersRepository;
import com.example.taks_2229_2021_user.service.ClientService;
import com.example.taks_2229_2021_user.service.UsersService;
import com.example.taks_2229_2021_user.util.DataUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsersServiceImpl implements UsersService {
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private ClientService clientService;
    private DataUtils dataUtils;
    private UserDto mapToDTO(Users users) {
        UserDto userDto = new UserDto();
        userDto.setUsername(users.getUsername());
        userDto.setPassword(users.getPassword());
        userDto.setFirstname(users.getFirstname());
        userDto.setLastname(users.getLastname());
        userDto.setEmail(users.getEmail());
        userDto.setRoleName(users.getRoleName());
        return userDto;
    }

    private Users mapToEntity(UserDto userDto) {
        Users users = new Users();
        users.setUsername(userDto.getUsername());
        users.setPassword(userDto.getPassword());
        users.setFirstname(userDto.getFirstname());
        users.setLastname(userDto.getLastname());
        users.setEmail(userDto.getEmail());
        users.setRoleName(userDto.getRoleName());
        return users;
    }

    @Override
    public UserDto createUserMap(UserDto userDto) {
        // convert DTO to entity
        Users newUser = usersRepository.save(mapToEntity(userDto));
        // convert entity to DTO
        return mapToDTO(newUser);
    }

    @Override
    public Boolean checkPassword(String password, String username) throws UsernameException {
        Users users = usersRepository.findById(username).orElse(null);
        if (users == null) {
            throw new UsernameException("User not found");
        } else {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String comparePassword = users.getPassword();
            return passwordEncoder.matches(password, comparePassword);
        }

    }

    @Override
    public Boolean changePassword(String password, String username) throws UsernameException, JsonProcessingException {
        Users usersChange = usersRepository.findById(username).orElse(null);
        if (usersChange == null) {
            throw new UsernameException("User not found");
        } else {
            usersChange.setPassword(BCrypt.hashpw(password, BCrypt.gensalt(12)));
            usersRepository.save(usersChange);
        }
        ObjectMapper om = new ObjectMapper();
        Object value;
        String json = om.writeValueAsString(usersChange);

        return true;
    }

    @Override
    public UserResponse getAllUsersPage(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        // create Pageable instance
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        Page<Users> users = usersRepository.findAll(pageable);

        // get content for page object
        List<Users> listOfPosts = users.getContent();

        List<UserDto> content = listOfPosts.stream().map(this::mapToDTO).collect(Collectors.toList());

        UserResponse userResponse = new UserResponse();
        userResponse.setUsers(content);
        userResponse.setPageNo(users.getNumber());
        userResponse.setPageSize(users.getSize());
        userResponse.setTotalElements(users.getTotalElements());
        userResponse.setTotalPages(users.getTotalPages());
        userResponse.setLast(users.isLast());

        return userResponse;
    }

    @Override
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    @Override
    public Users getUserByUserName(String name) throws UsernameException {
        Users users = usersRepository.findById(name).orElse(null);
        if (users == null) {
            throw new UsernameException("User not found");
        } else {
            return usersRepository.findById(name).orElse(null);
        }
    }

    @Override
    public Users createUser(Users users) throws UsernameExitException, MailException {
        checkEmailOrUsername(users);
        users.setPassword(BCrypt.hashpw(users.getPassword(), BCrypt.gensalt(12)));
        usersRepository.save(users);
        return users;
    }
    @Override
    public Boolean changePassUserThenForgotPas(Users users) {
        users.setPassword(DataUtils.generateTempPwd(8));
        clientService.forgotPassword(users, users.getPassword());
        users.setPassword(BCrypt.hashpw(users.getPassword(), BCrypt.gensalt(12)));
        usersRepository.save(users);
        return true;
    }

    @Override
    public Users updateUser(String userName, Users users) throws UsernameException {
        Users usersS = usersRepository.findById(userName).orElse(null);
        if (usersS == null) {
            throw new UsernameException("User not found");
        } else {
            usersS = new Users(users.getUsername(), users.getPassword(), users.getFirstname(), users.getLastname(), users.getEmail(), users.getRoleName());
            usersRepository.save(usersS);
            return usersS;
        }
    }

    @Override
    public Users deleteUser(String userName) throws UsernameException {
        Users usersS = usersRepository.findById(userName).orElse(null);
        if (usersS == null) {
            throw new UsernameException("User not found");
        } else {
            usersRepository.delete(usersS);
            return usersS;
        }
    }

    @Override
    public List<Users> getAllVaccineDTONotPagination() {
        return usersRepository.findAll();
    }
    @Override
    public Users checkMailForgotPass(String email){
        for(Users users : new ArrayList<>(usersRepository.findAll())){
            if(email.equals(users.getEmail())){
                return users;
            }
        }
        return null;
    }
    private void checkEmailOrUsername(Users users) throws MailException, UsernameExitException {
        for (Users userCheck : new ArrayList<>(usersRepository.findAll())) {
            if (users.getEmail().equals(userCheck.getEmail())) {
                throw new MailException("User with email: " + users.getEmail() + " already existed");
            }
            if (users.getUsername().equals(userCheck.getUsername())) {
                throw new UsernameExitException("Username: " + users.getUsername() + " already existed");
            }
        }
    }


}
