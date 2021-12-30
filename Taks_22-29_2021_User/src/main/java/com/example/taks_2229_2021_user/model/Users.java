package com.example.taks_2229_2021_user.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "demouser")
public class Users extends AuditorUser<String> {
    @Id
    @NotBlank(message = "Username can not be empty")
    @Column(name = "username")

    private String username;

    @NotBlank(message = "Password can not be empty")
    @Column(name = "pw")
    private String password;

    @NotBlank(message = "First name word can not be empty")
    @Column(name = "fsname")
    private String firstname;

    @NotBlank(message = "Last name can not be empty")
    @Column(name = "lsname")
    private String lastname;

    @NotBlank(message = "Email can not be empty")
    @Column(name = "email")
    @Email(message = "Email is not valid")
    private String email;

}
