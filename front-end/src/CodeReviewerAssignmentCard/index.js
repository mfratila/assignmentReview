import React from "react";
import { Card, Button } from "react-bootstrap";
import StatusBadge from "../StatusBadge";

const CodeReviewerAssignmentCard = ({
  assignment,
  buttonAction,
  buttonActionName,
}) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body className="d-flex flex-column justify-content-around">
        <Card.Title>Lucrarea #{assignment.number}</Card.Title>
        <div className="d-flex align-items-start">
          <StatusBadge text={assignment.status}></StatusBadge>
        </div>
        <Card.Text style={{ marginTop: "1em" }}>
          <b>GitHub URL:</b> {assignment.githubUrl}
        </Card.Text>
        <Card.Text style={{ marginTop: "1em" }}>
          <b>Branch:</b> {assignment.branch}
        </Card.Text>
        <Card.Text style={{ marginTop: "1em" }}>
          <b>Depusă de:</b> {assignment.user.name}
        </Card.Text>
        <Button variant="secondary" onClick={() => buttonAction(assignment)}>
          {buttonActionName}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CodeReviewerAssignmentCard;
