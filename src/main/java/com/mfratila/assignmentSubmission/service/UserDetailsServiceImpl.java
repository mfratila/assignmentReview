package com.mfratila.assignmentSubmission.service;

import com.mfratila.assignmentSubmission.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.mfratila.assignmentSubmission.domain.User;
import com.mfratila.assignmentSubmission.util.CustomPasswordEncoder;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Optional<User> userOpt = userRepository.findByUsername(username);

		return userOpt.orElseThrow(() -> new UsernameNotFoundException("Invalid Credentials"));
	}

}
