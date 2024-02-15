package com.mfratila.assignmentSubmission.service;

import com.mfratila.assignmentSubmission.domain.Authority;
import com.mfratila.assignmentSubmission.domain.User;
import com.mfratila.assignmentSubmission.dto.UserDto;
import com.mfratila.assignmentSubmission.enums.AuthorityEnum;
import com.mfratila.assignmentSubmission.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

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
        userDto.setAuthorities(getAuthorityNames((Collection<Authority>) user.getAuthorities()));

        return userDto;
    }

    private List<String> getAuthorityNames(Collection<Authority> authorities) {
        return authorities.stream()
                .map(Authority::getAuthority)
                .collect(Collectors.toList());
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
}
