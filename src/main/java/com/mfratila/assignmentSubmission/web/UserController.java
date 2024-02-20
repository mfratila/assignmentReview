package com.mfratila.assignmentSubmission.web;

import com.mfratila.assignmentSubmission.domain.User;
import com.mfratila.assignmentSubmission.dto.UserDto;
import com.mfratila.assignmentSubmission.dto.UserRequestDto;
import com.mfratila.assignmentSubmission.dto.UserResponseDto;
import com.mfratila.assignmentSubmission.enums.AuthorityEnum;
import com.mfratila.assignmentSubmission.service.UserService;
import com.mfratila.assignmentSubmission.util.AuthorityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.findAllUsers());
    }

    @PostMapping("")
    public ResponseEntity<?> createUser(@AuthenticationPrincipal User user) {
        User newUser = userService.save(user);

        return ResponseEntity.ok(newUser);
    }

    @GetMapping("{userId}")
    public ResponseEntity<?> getUser(@PathVariable Long userId) {
        User user = userService.findUserById(userId);
        UserDto userDto = userService.getUserDtoFromUser(user);
        UserResponseDto userResponseDto = new UserResponseDto(userDto);

        return ResponseEntity.ok(userResponseDto);
    }

    @PutMapping("{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Long userId,
                                        @RequestBody UserDto updatedUser) {
       UserDto updatedUserDto = userService.updateUser(updatedUser, userId);
       return ResponseEntity.ok(updatedUserDto);
    }


}
