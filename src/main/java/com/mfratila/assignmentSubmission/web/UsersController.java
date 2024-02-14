package com.mfratila.assignmentSubmission.web;

import com.mfratila.assignmentSubmission.dto.UserDto;
import com.mfratila.assignmentSubmission.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/users")
public class UsersController {

    @Autowired
    private UserService userService;

    @GetMapping("")
    ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.findAllUsers());
    }

}
