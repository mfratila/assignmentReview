import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Link } from "react-router-dom";
import ajax from "../Services/fetchService";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

const CodeReviewerDashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    ajax("api/assignments", "GET", jwt).then((assignmentsData) => {
      setAssignments(assignmentsData);
    });
  }, []);

  function claimAssignment(assignment) {
    const decodedJwt = jwtDecode(jwt);
    const user = {
      username: decodedJwt.sub,
    };
    assignment.codeReviewer = user;
    // TODO: update hardcoded value
    assignment.status = "In Review";
    ajax(`/api/assignments/${assignment.id}`, "PUT", jwt, assignment).then(
      (updatedAssignment) => {
        const assignmentsCopy = [...assignments];
        const i = assignmentsCopy.find((a) => a.id === assignment.id);
        assignmentsCopy[i] = updatedAssignment;
        setAssignments(assignmentsCopy);
      }
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <div
            className="d-flex justify-content-end"
            onClick={() => {
              setJwt(null);
              window.location.href = "/login";
            }}
          >
            Logout
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Code Reviewer Dashboard</h1>
        </Col>
      </Row>
      <div className="assignment-wrapper in-review">
        <div className="h3 px-2 assignment-wrapper-title">In Review</div>
        {assignments && assignments.filter(assignment => assignment.status === 'In Review').length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
          >
            {assignments.filter(assignment => assignment.status === "In Review").map((assignment) => (
              <Card style={{ width: "18rem" }}>
                <Card.Body className="d-flex flex-column justify-content-around">
                  <Card.Title>Assignment #{assignment.number}</Card.Title>
                  <div className="d-flex align-items-start">
                    <Badge pill bg="info" style={{ fontSize: "1em" }}>
                      {assignment.status}
                    </Badge>
                  </div>
                  <Card.Text style={{ marginTop: "1em" }}>
                    <p>
                      <b>GitHub URL:</b> {assignment.githubUrl}
                    </p>
                    <p>
                      <b>Branch:</b> {assignment.branch}
                    </p>
                  </Card.Text>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      claimAssignment(assignment);
                    }}
                  >
                    Claim
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <div>No assignments found</div>
        )}
      </div>
      <div className="assignment-wrapper submitted">
        <div className="h3 px-2 assignment-wrapper-title">Awaiting Review</div>
        {assignments && assignments.filter(assignment => assignment.status === 'Submitted').length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
          >
            {assignments.filter(assignment => assignment.status === "Submitted").map((assignment) => (
              <Card style={{ width: "18rem" }}>
                <Card.Body className="d-flex flex-column justify-content-around">
                  <Card.Title>Assignment #{assignment.number}</Card.Title>
                  <div className="d-flex align-items-start">
                    <Badge pill bg="info" style={{ fontSize: "1em" }}>
                      {assignment.status}
                    </Badge>
                  </div>
                  <Card.Text style={{ marginTop: "1em" }}>
                    <p>
                      <b>GitHub URL:</b> {assignment.githubUrl}
                    </p>
                    <p>
                      <b>Branch:</b> {assignment.branch}
                    </p>
                  </Card.Text>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      claimAssignment(assignment);
                    }}
                  >
                    Claim
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <div>No assignments found</div>
        )}
      </div>
      <div className="assignment-wrapper needs-update">
      <div className="h3 px-2 assignment-wrapper-title">Needs Update</div>
        { assignments && assignments.filter(assignment => assignment.status === 'Needs Update').length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
          >
            { assignments.filter(assignment => assignment.status === "Needs Update").map((assignment) => (
              <Card style={{ width: "18rem" }}>
                <Card.Body className="d-flex flex-column justify-content-around">
                  <Card.Title>Assignment #{assignment.number}</Card.Title>
                  <div className="d-flex align-items-start">
                    <Badge pill bg="info" style={{ fontSize: "1em" }}>
                      {assignment.status}
                    </Badge>
                  </div>
                  <Card.Text style={{ marginTop: "1em" }}>
                    <p>
                      <b>GitHub URL:</b> {assignment.githubUrl}
                    </p>
                    <p>
                      <b>Branch:</b> {assignment.branch}
                    </p>
                  </Card.Text>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      claimAssignment(assignment);
                    }}
                  >
                    Claim
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <div>No assignments found</div>
        )}
      </div>
    </Container>
  );
};

export default CodeReviewerDashboard;
