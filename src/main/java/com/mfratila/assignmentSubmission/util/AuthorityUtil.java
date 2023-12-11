package com.mfratila.assignmentSubmission.util;

import com.mfratila.assignmentSubmission.domain.User;

public class AuthorityUtil {
    public static Boolean hasRole(String role, User user) {
        return user.getAuthorities()
                .stream()
                .anyMatch(auth -> auth.getAuthority().equals(role));
    }
}
