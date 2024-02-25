package com.mfratila.assignmentSubmission.dto;

import com.mfratila.assignmentSubmission.domain.Assignment;
import com.mfratila.assignmentSubmission.enums.AssignmentEnum;
import com.mfratila.assignmentSubmission.enums.AssignmentStatusEnum;

import java.util.Set;

public class AssignmentResponseDto {

    private Assignment assignment;
    private Set<Assignment> assignments;
    private final AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
    private final AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();

    public AssignmentResponseDto(Assignment assignment) {
        super();
        this.assignment = assignment;
        this.assignments = null;
    }

    public AssignmentResponseDto(Set<Assignment> assignments) {
        super();
        this.assignment = null;
        this.assignments = assignments;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public Set<Assignment> getAssignments() {
        return assignments;
    }

    public void setAssignments(Set<Assignment> assignments) {
        this.assignments = assignments;
    }

    public AssignmentEnum[] getAssignmentEnums() {
        return assignmentEnums;
    }

    public AssignmentStatusEnum[] getStatusEnums() {
        return statusEnums;
    }
}
