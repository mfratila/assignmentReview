package com.mfratila.assignmentSubmission.web;

import com.mfratila.assignmentSubmission.domain.Assignment;
import com.mfratila.assignmentSubmission.domain.User;
import com.mfratila.assignmentSubmission.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @PostMapping("")
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user) {
        Assignment newAssignment = assignmentService.save(user);

        return  ResponseEntity.ok(newAssignment);
    }

    @GetMapping("")
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user) {
        Set<Assignment> assignmentsByUser = assignmentService.findByUser(user);
        return ResponseEntity.ok(assignmentsByUser);
    }

    @GetMapping("/{assignmentId}")
    public ResponseEntity<?> getAssignment(@PathVariable Long assignmentId, @AuthenticationPrincipal User user) {
        Optional<Assignment> assignmentOptional = assignmentService.findById(assignmentId);
        return ResponseEntity.ok(assignmentOptional.orElse(new Assignment()));
    }

}