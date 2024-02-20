package com.mfratila.assignmentSubmission.dto;

import java.util.List;

public class UserDto {
    private Long id;
    private String username;
    private List<String> authorities;
    private String name;
    private String password;

    public UserDto(Long id, String username, List<String> authorities, String name) {
        this.id = id;
        this.username = username;
        this.authorities = authorities;
        this.name = name;
        this.password = "";
    }

    public UserDto(Long id, String username, List<String> authorities, String name, String password) {
        this.id = id;
        this.username = username;
        this.authorities = authorities;
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

    public List<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<String> authorities) {
        this.authorities = authorities;
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
