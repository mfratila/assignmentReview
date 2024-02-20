package com.mfratila.assignmentSubmission.repository;

import com.mfratila.assignmentSubmission.domain.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
}
