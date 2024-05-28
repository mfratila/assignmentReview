import React from "react";
import { Card, Button } from "react-bootstrap";
import StatusBadge from "../StatusBadge";

const CodeReviewerAssignmentCard = ({
  id,
  assignment,
  buttonAction,
  buttonActionName,
}) => {
  return (
    <Card id={id} style={{ width: "18rem" }}>
      <Card.Body className="d-flex flex-column justify-content-around">
        <Card.Title id="card-title">Lucrarea #{assignment.number} - {assignment.title}</Card.Title>
        <div className="d-flex align-items-start">
          <StatusBadge text={assignment.status}></StatusBadge>
        </div>
        <Card.Text id="github-url-text" style={{ marginTop: "1em" }}>
          <b>GitHub URL:</b> {assignment.githubUrl}
        </Card.Text>
        <Card.Text id="github-branch-text" style={{ marginTop: "1em" }}>
          <b>Branch:</b> {assignment.branch}
        </Card.Text>
        <Card.Text id="student-name-text" style={{ marginTop: "1em" }}>
          <b>Depusă de:</b> {assignment.user.name}
        </Card.Text>
        <Button id="modify-assignment-btn" variant="secondary" onClick={() => buttonAction(assignment)}>
          {buttonActionName}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CodeReviewerAssignmentCard;
