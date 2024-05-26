package com.mfratila.assignmentSubmission.repository;

import com.mfratila.assignmentSubmission.domain.Assignment;
import com.mfratila.assignmentSubmission.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    Set<Assignment> findByUser(User user);

    @Query("select a from Assignment a "
            + "where (a.status = 'Trimis' and (a.codeReviewer is null or a.codeReviewer = :codeReviewer ))"
            + "or a.codeReviewer = :codeReviewer")
    Set<Assignment> findByCodeReviewer(User codeReviewer);

}
