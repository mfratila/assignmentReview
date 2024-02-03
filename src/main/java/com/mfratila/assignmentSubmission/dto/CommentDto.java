package com.mfratila.assignmentSubmission.dto;


import java.time.ZonedDateTime;

public class CommentDto {
    private Long id;
    private Long assignmentId;
    private String text;
    private String user;
    private ZonedDateTime createdDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(Long assignmentId) {
        this.assignmentId = assignmentId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public CommentDto(Long assignmentId, String text, String user) {
        this.assignmentId = assignmentId;
        this.text = text;
        this.user = user;
    }

    public CommentDto() {
        this.assignmentId = null;
        this.text = null;
        this.user = null;
    }

    @Override
    public String toString() {
        return "CommentDto{" +
                "assignmentId=" + assignmentId +
                ", text='" + text + '\'' +
                ", user='" + user + '\'' +
                '}';
    }
}
