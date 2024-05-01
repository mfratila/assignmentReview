package com.mfratila.assignmentSubmission.web;

import com.mfratila.assignmentSubmission.domain.Assignment;
import com.mfratila.assignmentSubmission.domain.User;
import com.mfratila.assignmentSubmission.dto.AssignmentResponseDto;
import com.mfratila.assignmentSubmission.enums.AssignmentStatusEnum;
import com.mfratila.assignmentSubmission.enums.AuthorityEnum;
import com.mfratila.assignmentSubmission.mail.EmailSenderService;
import com.mfratila.assignmentSubmission.service.AssignmentService;
import com.mfratila.assignmentSubmission.service.UserService;
import com.mfratila.assignmentSubmission.util.AuthorityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;
    @Autowired
    private UserService userService;
    @Autowired
    private EmailSenderService emailSenderService;

    @PostMapping("")
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user) {
        Assignment newAssignment = assignmentService.save(user);

        return  ResponseEntity.ok(newAssignment);
    }

    @GetMapping("")
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user) {
        Set<Assignment> assignmentsByUser = assignmentService.findByUser(user);
        AssignmentResponseDto response = new AssignmentResponseDto(assignmentsByUser);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{assignmentId}")
    public ResponseEntity<?> getAssignment(@PathVariable Long assignmentId, @AuthenticationPrincipal User user) {
        Optional<Assignment> assignmentOptional = assignmentService.findById(assignmentId);
        AssignmentResponseDto response = new AssignmentResponseDto(assignmentOptional.orElse(new Assignment()));
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{assignmentId}")
    public ResponseEntity<?> updateAssignment(@PathVariable Long assignmentId,
                                              @RequestBody Assignment assignment,
                                              @AuthenticationPrincipal User user) {
        // add code reviewer to this assignment if it was claimed
        if (assignment.getCodeReviewer() != null) {
            User codeReviewer = assignment.getCodeReviewer();
            codeReviewer = userService.findUserByUsername(codeReviewer.getUsername()).orElse(new User());

            if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_CODE_REVIEWER.name(), codeReviewer)) {
                assignment.setCodeReviewer(codeReviewer);
                if (assignment.getStatus().equalsIgnoreCase(AssignmentStatusEnum.IN_REVIEW.getStatus()))  {
                    emailSenderService.sendMail(assignment.getUser().getUsername(),
                            "Assignment " + assignment.getNumber() + " has been assigned to a reviewer",
                            "Your assignment has been taken by the following reviewer: " + codeReviewer.getUsername());
                }
            }
        }
        Assignment updatedAssignment = assignmentService.save(assignment);
        return ResponseEntity.ok(updatedAssignment);
    }

}
