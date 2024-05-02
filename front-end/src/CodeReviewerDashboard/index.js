import React, { useEffect, useState } from "react";
import ajax from "../Services/fetchService";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../StatusBadge";
import { useUser } from "../UserProvider";
import NavigationBar from "../Navbar";

const CodeReviewerDashboard = () => {
  const navigate = useNavigate();
  const user = useUser();
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    ajax("api/assignments", "GET", user.jwt).then((assignmentsData) => {
      setAssignments(assignmentsData.assignments);
    });
  }, []);

  function claimAssignment(assignment) {
    const decodedJwt = jwtDecode(user.jwt);
    const decodedUser = {
      username: decodedJwt.sub,
    };
    assignment.codeReviewer = decodedUser;
    // TODO: update hardcoded value
    assignment.status = "In Review";
    ajax(`/api/assignments/${assignment.id}`, "PUT", user.jwt, assignment).then(
      (updatedAssignment) => {
        const assignmentsCopy = [...assignments];
        const i = assignmentsCopy.find((a) => a.id === assignment.id);
        assignmentsCopy[i] = updatedAssignment;
        setAssignments(assignmentsCopy);
      }
    );
  }

  function editReview(assignment) {
    navigate(`/assignments/${assignment.id}`);
  }

  return (
    <>
    <NavigationBar />
    <Container>
      <Row>
        <Col className="mt-4 mb-4">
          <h1>Tabel de bord Profesori</h1>
        </Col>
      </Row>
      <div className="assignment-wrapper in-review">
        <div className="h3 px-2 assignment-wrapper-title">In Revizuire</div>
        {assignments &&
        assignments.filter((assignment) => assignment.status === "In Review")
          .length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
          >
            {assignments
              .filter((assignment) => assignment.status === "In Review")
              .map((assignment) => (
                <Card style={{ width: "18rem" }}>
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Lucrarea #{assignment.number}</Card.Title>
                    <div className="d-flex align-items-start">
                      <StatusBadge text={assignment.status}></StatusBadge>
                    </div>
                    <Card.Text style={{ marginTop: "1em" }}>
                      <p>
                        <b>GitHub URL:</b> {assignment.githubUrl}
                      </p>
                      <p>
                        <b>Branch:</b> {assignment.branch}
                      </p>
                      <p>
                        <b>Depusă de:</b> {assignment.user.name}
                      </p>
                    </Card.Text>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        editReview(assignment);
                      }}
                    >
                      Modifică
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>Nici o lucrare găsită</div>
        )}
      </div>
      <div className="assignment-wrapper submitted">
        <div className="h3 px-2 assignment-wrapper-title">Așteaptă Revizuire</div>
        {assignments &&
        assignments.filter(
          (assignment) =>
            assignment.status === "Submitted" ||
            assignment.status === "Resubmitted"
        ).length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
          >
            {assignments
              .filter(
                (assignment) =>
                  assignment.status === "Submitted" ||
                  assignment.status === "Resubmitted"
              )
              .sort((a, b) => { if (a.status === "Resubmitted") return -1;
            else return 1; })
              .map((assignment) => (
                <Card style={{ width: "18rem" }}>
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Lucrarea #{assignment.number}</Card.Title>
                    <div className="d-flex align-items-start">
                      <StatusBadge text={assignment.status}></StatusBadge>
                    </div>
                    <Card.Text style={{ marginTop: "1em" }}>
                      <p>
                        <b>GitHub URL:</b> {assignment.githubUrl}
                      </p>
                      <p>
                        <b>Branch:</b> {assignment.branch}
                      </p>
                      <p>
                        <b>Depusă de:</b> {assignment.user.name}
                      </p>
                    </Card.Text>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        claimAssignment(assignment);
                      }}
                    >
                      Revendică
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>Nici o lucrare găsită</div>
        )}
      </div>
      <div className="assignment-wrapper needs-update">
        <div className="h3 px-2 assignment-wrapper-title">Necesită Modificări</div>
        {assignments &&
        assignments.filter((assignment) => assignment.status === "Needs Update")
          .length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
          >
            {assignments
              .filter((assignment) => assignment.status === "Needs Update")
              .map((assignment) => (
                <Card style={{ width: "18rem" }}>
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Lucrarea #{assignment.number}</Card.Title>
                    <div className="d-flex align-items-start">
                      <StatusBadge text={assignment.status}></StatusBadge>
                    </div>
                    <Card.Text style={{ marginTop: "1em" }}>
                      <p>
                        <b>GitHub URL:</b> {assignment.githubUrl}
                      </p>
                      <p>
                        <b>Branch:</b> {assignment.branch}
                      </p>
                      <p>
                        <b>Depusă de:</b> {assignment.user.name}
                      </p>
                    </Card.Text>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        navigate(`/assignments/${assignment.id}`);
                      }}
                    >
                      Accesează
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>Nici o lucrare găsită</div>
        )}
      </div>
    </Container>
    </>
  );
};

export default CodeReviewerDashboard;
