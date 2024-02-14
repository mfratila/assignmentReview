package com.mfratila.assignmentSubmission.service;

import com.mfratila.assignmentSubmission.domain.Authority;
import com.mfratila.assignmentSubmission.domain.User;
import com.mfratila.assignmentSubmission.dto.UserDto;
import com.mfratila.assignmentSubmission.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    private List<String> getAuthorityNames(Collection<Authority> authorities) {
        return authorities.stream()
                .map(Authority::getAuthority)
                .collect(Collectors.toList());
    }

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
