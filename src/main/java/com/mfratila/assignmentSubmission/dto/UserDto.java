package com.mfratila.assignmentSubmission.dto;

import java.util.List;

public class UserDto {
    private Long id;
    private String username;
    private String authority;
    private String name;
    private String password;

    public UserDto(Long id, String username, String authority, String name) {
        this.id = id;
        this.username = username;
        this.authority = authority;
        this.name = name;
        this.password = "";
    }

    public UserDto(Long id, String username, String authority, String name, String password) {
        this.id = id;
        this.username = username;
        this.authority = authority;
        this.name = name;
        this.password = password;
    }

    public UserDto() {};

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
