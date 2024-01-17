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
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);
  const [comment, setComment] = useState({
    text: "",
    assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
    user: user.jwt
  });
  const [comments, setComments] = useState([]);

  const previousAssignmentValue = useRef(assignment);

  const inputElem = document.getElementById("commentInput");

  function submitComment() {
    ajax('/api/comments', 'post', user.jwt, comment).then((commentData) => {
    inputElem.value = "";
    const commentsCopy = [...comments];
    commentsCopy.push(commentData);

    setComments(commentsCopy);
  });
  }

  function updateComment(value) {
    const commentCopy = {...comment};
    commentCopy.text = value;
    setComment(commentCopy);
  }

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

  useEffect(() => {
    ajax(`/api/comments?assignmentId=${assignmentId}`, "get", user.jwt, null).then((commentsData) => {
      setComments(commentsData);
    });
  }, [])

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          {assignment.number ? <h1>Assignment {assignment.number}</h1> : <></>}
        </Col>
        <Col>
          <StatusBadge text={assignment.status}></StatusBadge>
        </Col>
      </Row>
      {assignment ? (
        <>
          <Form.Group as={Row} className="my-3" controlId="assignmentName">
            <Form.Label column sm="3" md="2">
              Assignment Number:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton
                as={ButtonGroup}
                variant="info"
                title={
                  assignment.number
                    ? `Assignment ${assignment.number}`
                    : "Select an Assignment"
                }
                onSelect={(selectedElement) => {
                  updateAssignment("number", selectedElement);
                }}
              >
                {assignmentEnums.map((assignmentEnum) => (
                  <Dropdown.Item
                    key={assignmentEnum.assignmentNum}
                    eventKey={assignmentEnum.assignmentNum}
                  >
                    {assignmentEnum.assignmentNum}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="githubUrl">
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
          <Form.Group as={Row} className="mb-3" controlId="gitHubBranch">
            <Form.Label column sm="3" md="2">
              Branch:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
                placeholder="example_branch_name"
                onChange={(e) => updateAssignment("branch", e.target.value)}
                value={assignment.branch}
              />
            </Col>
          </Form.Group>
          {assignment.status === "Completed" ? (
            <div>
              <Form.Group
                as={Row}
                className="d-flex align-items-center mb-3"
                controlId="codeReviewVideoUrl"
              >
                <Form.Label column sm="3" md="2">
                  Code Review Video URL:
                </Form.Label>
                <Col sm="9" md="8" lg="6">
                  <a
                    href={assignment.codeReviewVideoUrl}
                    style={{ fontWeight: "bold" }}
                  >
                    {assignment.codeReviewVideoUrl}
                  </a>
                </Col>
              </Form.Group>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/dashboard")}
              >
                Back
              </Button>
            </div>
          ) : assignment.status === "Pending Submission" ? (
            <div className="d-flex gap-5">
              <Button size="lg" onClick={() => save(assignmentStatuses[1].status)}>
                Submit Assignment
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/dashboard")}
              >
                Back
              </Button>
            </div>
          ) : (
            <div className="d-flex gap-5">
              <Button size="lg" onClick={() => save(assignmentStatuses[5].status)}>
                Resubmit Assignment
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/dashboard")}
              >
                Back
              </Button>
            </div>
          )}
            <div className="mt-4">
              <textarea
              id = "commentInput"
              style={{ width: "100%", borderRadius: "0.25em" }}
              onChange={(e) => updateComment(e.target.value)}> 
              </textarea>
              <Button onClick={() => submitComment()}>Post Comment</Button>
            </div>
            <div className="mt-5">
              {comments.map((comment) => (
                <div key={comment.id}>
                  <span style={{fontWeight: 'bold'}}>
                    {`[${comment.createdDate}] ${comment.createdBy.name}: `}
                  </span>
                  {comment.text}
                </div>
              ))}
            </div>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default AssignmentView;
