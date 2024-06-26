import React, { useEffect, useRef, useState } from "react";
import ajax from "../Services/fetchService";
import {
  Button,
  Col,
  Row,
  Form,
  Container,
  DropdownButton,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../StatusBadge";
import { useUser } from "../UserProvider";
import { useParams } from "react-router-dom";
import CommentContainer from "../CommentContainer";

const AssignmentView = () => {
  const navigate = useNavigate();
  const user = useUser();
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState({
    githubUrl: "",
    branch: "",
    number: null,
    status: null,
  });
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const previousAssignmentValue = useRef(assignment);

  function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
  }

  async function save(status) {
    if (assignment.number === null) {
      setErrorMessage("Te rog selectează numărul lucrării.");
      return;
    }

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
    ajax(`/api/assignments`, "GET", user.jwt).then((assignmentResponse) => {
      let assignmentsData = assignmentResponse.assignments;
      setAssignments(assignmentsData);
    });
  }, []);

  const assignedNumbers = new Set(
    assignments.map((assignment) => assignment.number)
  );

  const filteredAssignmentEnums = assignmentEnums.filter(
    (assignmentEnum) => !assignedNumbers.has(assignmentEnum.assignmentNum)
  );

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          {assignment.number !== null ? (
            <h1>Lucrarea #{assignment.number}</h1>
          ) : (
            <>Lucrare nouă</>
          )}
        </Col>
        <Col>
          <StatusBadge text={assignment.status}></StatusBadge>
        </Col>
      </Row>
      {assignment ? (
        <>
          <Form.Group as={Row} className="my-3" controlId="assignmentName">
            <Form.Label column sm="3" md="2">
              Numărul Lucrarii:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton id='assignment-number-dropdown'
                as={ButtonGroup}
                variant="info"
                title={
                  assignment.number !== null
                    ? `Lucrarea  #${assignment.number}`
                    : "Selectează numărul lucrării"
                }
                onSelect={(selectedElement) => {
                  setErrorMessage(""); // Clear error message on selection
                  updateAssignment("number", selectedElement);
                }}
              >
                {filteredAssignmentEnums.map((assignmentEnum) => (
                  <Dropdown.Item id={`assignment-number-${assignmentEnum.assignmentNum}`}
                    key={assignmentEnum.assignmentNum}
                    eventKey={assignmentEnum.assignmentNum}
                  >
                    {assignmentEnum.assignmentNum}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              {errorMessage && (
                <div id="error-message" style={{ color: "red", marginTop: "10px" }}>
                  {errorMessage}
                </div>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="githubUrl-input">
            <Form.Label column sm="3" md="2">
              GitHub URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
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
                type="text"
                placeholder="example_branch_name"
                onChange={(e) => updateAssignment("branch", e.target.value)}
                value={assignment.branch}
              />
            </Col>
          </Form.Group>
          {assignment.status === "Completat" ? (
            <div>
              <Form.Group
                as={Row}
                className="d-flex align-items-center mb-3"
                controlId="codeReviewVideoUrl-input"
              >
                <Form.Label column sm="3" md="2">
                  Revizuire Cod Video URL:
                </Form.Label>
                <Col sm="9" md="8" lg="6">
                  <a
                    href={assignment.codeReviewVideoUrl}
                    target="_blank"
                    style={{ fontWeight: "bold" }}
                  >
                    {assignment.codeReviewVideoUrl}
                  </a>
                </Col>
              </Form.Group>
              <Button id="back-btn"
                size="lg"
                variant="secondary"
                onClick={() => navigate("/dashboard")}
              >
                Mergi Înapoi
              </Button>
            </div>
          ) : assignment.status === "În așteptarea trimiterii" ? (
            <div className="d-flex gap-5">
              <Button id="submit-btn"
                size="lg"
                onClick={() => save(assignmentStatuses[1].status)}
              >
                Depune Lucrarea
              </Button>
              <Button id="back-btn"
                size="lg"
                variant="secondary"
                onClick={() => navigate("/dashboard")}
              >
                Mergi Înapoi
              </Button>
            </div>
          ) : assignment.status === "Necesită Modificări" ? (
            <div className="d-flex gap-5">
              <Button id='resend-btn'
                size="lg"
                onClick={() => save(assignmentStatuses[5].status)}
              >
                Re-depune Lucrarea
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/dashboard")}
              >
                Mergi Înapoi
              </Button>
            </div>
          ) : (
            <div className="d-flex gap-5">
              <Button id="back-btn"
                size="lg"
                variant="secondary"
                onClick={() => navigate("/dashboard")}
              >
                Mergi Înapoi
              </Button>
            </div>
          )}
          <CommentContainer id="comment-container" assignmentId={assignmentId} />
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default AssignmentView;
