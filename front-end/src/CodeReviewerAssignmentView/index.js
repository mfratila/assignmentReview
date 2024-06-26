import React, { useEffect, useRef, useState } from "react";
import ajax from "../Services/fetchService";
import { Button, Col, Row, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../StatusBadge";
import { useUser } from "../UserProvider";
import CommentContainer from "../CommentContainer";

const CodeReviewerAssignmentView = () => {
  const navigate = useNavigate();
  const user = useUser();
  const assignmentId = window.location.href.split("/assignments/")[1];
  const [assignment, setAssignment] = useState({
    githubUrl: "",
    branch: "",
    number: null,
    status: null,
  });
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);

  const previousAssignmentValue = useRef(assignment);

  function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
  }

  async function save(status) {
    if (status && assignment.status !== status) {
      updateAssignment("status", status);
    } else {
      persist();
    }
  }

  function persist() {
    ajax(`/api/assignments/${assignmentId}`, "PUT", user.jwt, assignment).then(
      (assignmentData) => {
        setAssignment(assignmentData);
      }
    );
  }

  useEffect(() => {
    if (previousAssignmentValue.current.status !== assignment.status) {
      persist();
    }
    previousAssignmentValue.current = assignment;
  }, [assignment]);

  useEffect(() => {
    ajax(`/api/assignments/${assignmentId}`, "GET", user.jwt).then(
      (assignmentResponse) => {
        let assignmentData = assignmentResponse.assignment;
        if (assignmentData.branch === null) assignmentData.branch = "";
        if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
        setAssignment(assignmentData);
        setAssignmentEnums(assignmentResponse.assignmentEnums);
        setAssignmentStatuses(assignmentResponse.statusEnums);
      }
    );
  }, []);

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          {assignment.number ? (
            <h1 id="assignment-title">
              Lucrarea #{assignment.number} - {assignment.title}
            </h1>
          ) : (
            <></>
          )}
        </Col>
        <Col>
          <StatusBadge text={assignment.status}></StatusBadge>
        </Col>
      </Row>
      {assignment ? (
        <>
          <Form.Group as={Row} className="my-3" controlId="githubUrl-input">
            <Form.Label column sm="3" md="2">
              GitHub URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
                readOnly
                placeholder="https://github.com/username/repo-name"
                onChange={(e) => updateAssignment("githubUrl", e.target.value)}
                value={assignment.githubUrl}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="gitHubBranch-input">
            <Form.Label column sm="3" md="2">
              Branch:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
                readOnly
                placeholder="example_branch_name"
                onChange={(e) => updateAssignment("branch", e.target.value)}
                value={assignment.branch}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="reviewVideoUrl-input">
            <Form.Label column sm="3" md="2">
              Video Review URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
                placeholder="https:/screencast-o-matic.com/something"
                onChange={(e) =>
                  updateAssignment("codeReviewVideoUrl", e.target.value)
                }
                value={assignment.codeReviewVideoUrl || ""}
              />
            </Col>
          </Form.Group>
          <div className="d-flex gap-5">
            {assignmentStatuses.length > 4 && assignment.status === assignmentStatuses[4].status ? (
              <Button
                id="take-to-review-btn"
                size="lg"
                variant="secondary"
                onClick={() => save(assignmentStatuses[2].status)}
              >
                Revendică
              </Button>
            ) : (
              <Button
                id="complete-review-btn"
                size="lg"
                onClick={() => save(assignmentStatuses[4].status)}
              >
                Completează Revizuirea
              </Button>
            )}

            {assignmentStatuses.length > 3 && assignment.status === assignmentStatuses[3].status ? (
              <Button
                id="take-review-again-btn"
                size="lg"
                variant="secondary"
                onClick={() => save(assignmentStatuses[2].status)}
              >
                Revendică din nou
              </Button>
            ) : (
              <Button
                id="decline-assignment-btn"
                size="lg"
                variant="danger"
                onClick={() => save(assignmentStatuses[3].status)}
              >
                Respinge Lucrarea
              </Button>
            )}

            <Button
              id="back-btn"
              size="lg"
              variant="secondary"
              onClick={() => navigate("/dashboard")}
            >
              Mergi Înapoi
            </Button>
          </div>

          <CommentContainer assignmentId={assignmentId} />
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default CodeReviewerAssignmentView;
