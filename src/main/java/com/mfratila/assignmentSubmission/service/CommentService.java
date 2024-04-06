package com.mfratila.assignmentSubmission.service;

import com.mfratila.assignmentSubmission.domain.Assignment;
import com.mfratila.assignmentSubmission.domain.Comment;
import com.mfratila.assignmentSubmission.domain.User;
import com.mfratila.assignmentSubmission.dto.CommentDto;
import com.mfratila.assignmentSubmission.mail.EmailSenderService;
import com.mfratila.assignmentSubmission.repository.AssignmentRepository;
import com.mfratila.assignmentSubmission.repository.CommentRepository;
import com.mfratila.assignmentSubmission.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.Set;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private AssignmentRepository assignmentRepository;
    @Autowired
    private EmailSenderService emailSenderService;
    @Autowired
    private JwtUtil jwtUtil;

    public Comment save(CommentDto commentDto, User user) {
        Comment comment = new Comment();
        Assignment assignment = assignmentRepository.getReferenceById(commentDto.getAssignmentId());

        comment.setId(commentDto.getId());
        comment.setAssignment(assignment);
        comment.setText(commentDto.getText());
        comment.setCreatedBy(user);

        if (comment.getId() == null)
            comment.setCreatedDate(ZonedDateTime.now());
        else {
            comment.setCreatedDate(commentDto.getCreatedDate());
        }

        emailSenderService.sendMail(assignment.getUser().getUsername(),
                "New comment on Assignment " + assignment.getNumber(),
                "The user " + jwtUtil.getUsernameFromToken(commentDto.getUser())
                        + " has left the following comment on your assignment: \n \n"
                        + commentDto.getText());

        return commentRepository.save(comment);
    }

    public Set<Comment> getCommentsByAssignmentId(Long assignmentId) {

        return commentRepository.findByAssignmentId(assignmentId);
    }

    public void deleteCommentById(Long commentId) {
        commentRepository.deleteById(commentId);
    }

}
