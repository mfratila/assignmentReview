package com.mfratila.assignmentSubmission.web;

import com.mfratila.assignmentSubmission.domain.Comment;
import com.mfratila.assignmentSubmission.domain.User;
import com.mfratila.assignmentSubmission.dto.CommentDto;
import com.mfratila.assignmentSubmission.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("")
    public ResponseEntity<Comment> createComment(@RequestBody CommentDto commentDto, @AuthenticationPrincipal User user) {
        Comment comment = commentService.save(commentDto, user);

        return ResponseEntity.ok(comment);
    }

    @GetMapping("")
    public ResponseEntity<Set<Comment>> getCommentsByAssignment(@RequestParam Long assignmentId) {

        Set<Comment> comments = commentService.getCommentsByAssignmentId(assignmentId);

        return ResponseEntity.ok(comments);
    }

    @PutMapping("{commentId}")
    public ResponseEntity<Comment> updateComment(@RequestBody CommentDto commentDto, @AuthenticationPrincipal User user) {
        Comment comment = commentService.save(commentDto, user);

        return ResponseEntity.ok(comment);
    }

    @DeleteMapping("{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {
        try {
            commentService.deleteCommentById(commentId);
            Map<String, Object> map = new HashMap<>();
            map.put("response", "Comment deleted");
            return ResponseEntity.ok(map);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
