package com.mfratila.assignmentSubmission.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentStatusEnum {
    PENDING_SUBMISSION("În așteptarea trimiterii", 1),
    SUBMITTED("Trimis", 2),
    IN_REVIEW("In Revizuire", 3),
    NEEDS_UPDATE("Necesită Modificări", 4),
    COMPLETED("Completat", 5),
    RESUBMITTED("Retrimis", 6);

    private final String status;
    private final Integer step;
    AssignmentStatusEnum(String status, Integer step) {
        this.status = status;
        this.step = step;
    }

    public String getStatus() {
        return status;
    }

    public Integer getStep() {
        return step;
    }
}
