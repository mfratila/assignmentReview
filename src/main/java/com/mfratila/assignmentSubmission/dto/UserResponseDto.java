package com.mfratila.assignmentSubmission.dto;

import com.mfratila.assignmentSubmission.enums.AuthorityEnum;

import java.util.ArrayList;
import java.util.List;

public class UserResponseDto {

    private UserDto user;
    private final List<String> authorities = new ArrayList<>();

    public UserResponseDto(UserDto user) {
        super();
        this.user = user;
        this.authorities.add(AuthorityEnum.ROLE_STUDENT.name());
        this.authorities.add(AuthorityEnum.ROLE_CODE_REVIEWER.name());
        this.authorities.add(AuthorityEnum.ROLE_ADMIN.name());
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public List<String> getAuthorities() {
        return authorities;
    }
}
