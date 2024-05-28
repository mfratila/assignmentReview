package com.mfratila.assignmentSubmission.service;

import com.mfratila.assignmentSubmission.domain.Assignment;
import com.mfratila.assignmentSubmission.domain.User;
import com.mfratila.assignmentSubmission.enums.AssignmentEnum;
import com.mfratila.assignmentSubmission.enums.AssignmentStatusEnum;
import com.mfratila.assignmentSubmission.enums.AuthorityEnum;
import com.mfratila.assignmentSubmission.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment save(User user) {
        Assignment assignment = new Assignment();
        assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
        assignment.setUser(user);

        return assignmentRepository.save(assignment);
    }

    private Integer findNextAssignmentToSubmit(User user) {
        Set<Assignment> assignmentsByUser = assignmentRepository.findByUser(user);
        if (assignmentsByUser == null) {
            return 1;
        }
        Optional<Integer> nextAssignmentNumberOpt = assignmentsByUser.stream()
                .sorted((a1, a2) -> {
            if (a1.getNumber() == null) return 1;
            if (a2.getNumber() == null) return 1;
            return a2.getNumber().compareTo(a1.getNumber());
        })
                .map(assignment -> {
                    if (assignment.getNumber() == null) return 1;
                    return assignment.getNumber() + 1;
                })
                .findFirst();

        return nextAssignmentNumberOpt.orElse(1);
    }

    public Set<Assignment> findByUser(User user) {
        // load assignments if you're a code reviewer role
        boolean hasCodeReviewerRole = user.getAuthorities()
                .stream()
                .anyMatch(auth -> AuthorityEnum.ROLE_CODE_REVIEWER.name().equals(auth.getAuthority()));
        if (hasCodeReviewerRole) {
            return assignmentRepository.findByCodeReviewer(user);
        } else {
            // load assignments if you're a student role
            return assignmentRepository.findByUser(user);
        }

    }

    public Optional<Assignment> findById(Long assignmentId) {
        return assignmentRepository.findById(assignmentId);
    }

    public Assignment save(Assignment assignment) {
        if (assignment.getNumber() != null){
            AssignmentEnum assignmentEnum = AssignmentEnum.findByNumber(assignment.getNumber());
            assignment.setTitle(assignmentEnum.getAssignmentName());
            assignment.setSubtitle(assignmentEnum.getAssignmentSubtitle());
            assignment.setDescription(assignmentEnum.getAssignmentDesc());
        }
        return assignmentRepository.save(assignment);
    }
}
