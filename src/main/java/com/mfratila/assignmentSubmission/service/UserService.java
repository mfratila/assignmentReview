package com.mfratila.assignmentSubmission.service;

import com.mfratila.assignmentSubmission.domain.Authority;
import com.mfratila.assignmentSubmission.domain.User;
import com.mfratila.assignmentSubmission.dto.ExistingUserDto;
import com.mfratila.assignmentSubmission.dto.UserDto;
import com.mfratila.assignmentSubmission.enums.AuthorityEnum;
import com.mfratila.assignmentSubmission.repository.AuthorityRepository;
import com.mfratila.assignmentSubmission.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthorityRepository authorityRepository;

    private final PasswordEncoder passwordEncoder  = new BCryptPasswordEncoder();

    public List<UserDto> findAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream().map(user -> new UserDto(user.getId(), user.getUsername(), getAuthorityNames((Collection<Authority>) user.getAuthorities()), user.getName()))
                .collect(Collectors.toList());
    }

    public UserDto getUserDtoFromUser(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setName(user.getName());
        userDto.setAuthority(getAuthorityNames((Collection<Authority>) user.getAuthorities()));
        userDto.setPassword(user.getPassword());

        return userDto;
    }

    private String getAuthorityNames(Collection<Authority> authorities) {
        return authorities.stream()
                .map(authority -> {
                    String auth = authority.getAuthority();
                    return auth;
                })
                .findFirst().orElse("");
    }

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User findUserById(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        return userOptional.orElse(new User());
    }

    public User save(User user) {
        boolean hasAdminRole = user.getAuthorities()
                .stream()
                .anyMatch(auth -> AuthorityEnum.ROLE_ADMIN.name().equals(auth.getAuthority()));
        if (hasAdminRole) {
            User newUser = new User();
            user.setCohortStartDate(LocalDate.now());

            return userRepository.save(newUser);
        }
        return null;
    }

    public UserDto updateUser(UserDto userDto, Long updatedUserId) {
        User userToBeUpdated = userRepository.findById(updatedUserId).orElseThrow(IllegalStateException::new);
        userToBeUpdated.setUsername(userDto.getUsername());
        userToBeUpdated.setAuthorities(convertAuthorityFromString(userDto.getAuthority(), userToBeUpdated));
        userToBeUpdated.setName(userDto.getName());
        String encodedPassword = passwordEncoder.encode(userDto.getPassword());
        userToBeUpdated.setPassword(encodedPassword);

        userRepository.save(userToBeUpdated);
        return getUserDtoFromUser(userToBeUpdated);
    }

    public UserDto updateExistingUser(ExistingUserDto userDto, Long updatedUserId) {
        User userToBeUpdated = userRepository.findById(updatedUserId).orElseThrow(IllegalStateException::new);
        userToBeUpdated.setUsername(userDto.getUsername());
        userToBeUpdated.setAuthorities(convertAuthorityFromString(userDto.getAuthority(), userToBeUpdated));
        userToBeUpdated.setName(userDto.getName());

        userRepository.save(userToBeUpdated);
        return getUserDtoFromUser(userToBeUpdated);
    }

    private List<Authority> convertAuthorityFromString(String authority, User user) {
        if (authority != null ) {
            Authority newAuthority = new Authority();
            newAuthority.setAuthority(authority);
            newAuthority.setUser(user);
            authorityRepository.save(newAuthority);

            List<Authority> authorityList = new ArrayList<>();
            authorityList.add(newAuthority);
            return authorityList;
        }
        return null;
    }
}
