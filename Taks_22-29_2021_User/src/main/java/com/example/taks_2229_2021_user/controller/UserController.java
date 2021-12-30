package com.example.taks_2229_2021_user.controller;

import com.example.taks_2229_2021_user.exception.ThrowException;
import com.example.taks_2229_2021_user.model.Users;
import com.example.taks_2229_2021_user.model.utils.PagingHeaders;
import com.example.taks_2229_2021_user.model.utils.PagingResponse;
import com.example.taks_2229_2021_user.payload.UserDto;
import com.example.taks_2229_2021_user.payload.UserResponse;
import com.example.taks_2229_2021_user.service.UsersService;
import com.example.taks_2229_2021_user.service.impl.UserSearch;
import com.example.taks_2229_2021_user.util.AppConstants;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UsersService usersService;
    @Autowired
    private UserSearch userSearch;


    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/page")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(usersService.createUser(userDto), HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/page")
    public UserResponse getAllUsers(
            @RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir
    ) {
        return usersService.getAllUsersPage(pageNo, pageSize, sortBy, sortDir);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("user-not-pagination")
    public List<Users> getAllUser(){
        return usersService.getAllUsers();
    }
    @GetMapping("/{username}")
    public Users getUserByUsername(@PathVariable("username") String name) throws ThrowException {
        return usersService.getUserByUserName(name);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("")
    public String createUser(@RequestBody @Valid Users users) throws ThrowException {
        usersService.createUser(users);
        return "Create successfully";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/{username}")
    public String updateUser(@PathVariable("username") String name, @RequestBody @Valid Users users) throws ThrowException {
        usersService.updateUser(name, users);
        return "Update successfully";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/{username}")
    public String deleteUser(@PathVariable("username") String name) throws ThrowException {
        usersService.deleteUser(name);
        return "Delete successfully";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @Transactional
    @GetMapping(value = "/mapsearch", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Users>> get(
            @And({
                    @Spec(path = "username", params = "username", spec = Like.class),
                    @Spec(path = "firstname", params = "firstname", spec = Like.class),
                    @Spec(path = "lastname", params = "lastname", spec = Like.class),
                    @Spec(path = "email", params = "email", spec = Like.class)
            }) Specification<Users> spec,
            Sort sort,
            @RequestHeader HttpHeaders headers) {
        final PagingResponse response = userSearch.get(spec, headers, sort);
        return new ResponseEntity<>(response.getElements(), returnHttpHeaders(response), HttpStatus.OK);
    }

    public HttpHeaders returnHttpHeaders(PagingResponse response) {
        HttpHeaders headers = new HttpHeaders();
        headers.set(PagingHeaders.COUNT.getName(), String.valueOf(response.getCount()));
        headers.set(PagingHeaders.PAGE_SIZE.getName(), String.valueOf(response.getPageSize()));
        headers.set(PagingHeaders.PAGE_OFFSET.getName(), String.valueOf(response.getPageOffset()));
        headers.set(PagingHeaders.PAGE_NUMBER.getName(), String.valueOf(response.getPageNumber()));
        headers.set(PagingHeaders.PAGE_TOTAL.getName(), String.valueOf(response.getPageTotal()));
        return headers;
    }

}
