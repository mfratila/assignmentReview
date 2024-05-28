import React, { useEffect, useState } from "react";
import ajax from "../Services/fetchService";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../StatusBadge";
import { useUser } from "../UserProvider";
import NavigationBar from "../Navbar";
import CodeReviewerAssignmentCard from "../CodeReviewerAssignmentCard";

const CodeReviewerDashboard = () => {
  const navigate = useNavigate();
  const user = useUser();
  const [assignments, setAssignments] = useState(null);
  const [statusEnums, setStatusEnums] = useState(null);

  useEffect(() => {
    ajax("api/assignments", "GET", user.jwt).then((assignmentsData) => {
      setAssignments(assignmentsData.assignments);
      setStatusEnums(assignmentsData.statusEnums);
      console.log(statusEnums);
    });
  }, []);

  function claimAssignment(assignment) {
    const decodedJwt = jwtDecode(user.jwt);
    const decodedUser = {
      username: decodedJwt.sub,
    };
    assignment.codeReviewer = decodedUser;
    assignment.status = statusEnums[2].status;
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
            <h1 id="dashboard-title">Tabel de bord Profesori</h1>
          </Col>
        </Row>
        <div className="assignment-wrapper in-review">
          <div className="h3 px-2 assignment-wrapper-title">In Revizuire</div>
          {assignments &&
          assignments.filter((assignment) => assignment.status === "In Revizuire")
            .length > 0 ? (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
            >
              {assignments
                .filter((assignment) => assignment.status === "In Revizuire")
                .map((assignment, index) => (
                  <CodeReviewerAssignmentCard id={`in-review-assignment-card-${index}`}
                    assignment={assignment}
                    buttonAction={editReview}
                    buttonActionName={"Modifică"}
                  />
                ))}
            </div>
          ) : (
            <div id="no-in-review-assignment-found-text">Nici o lucrare găsită</div>
          )}
        </div>
        <div className="assignment-wrapper submitted">
          <div className="h3 px-2 assignment-wrapper-title">
            Așteaptă Revizuire
          </div>
          {assignments &&
          assignments.filter(
            (assignment) =>
              assignment.status === "Trimis" ||
              assignment.status === "Retrimis"
          ).length > 0 ? (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
            >
              {assignments
                .filter(
                  (assignment) =>
                    assignment.status === "Trimis" ||
                    assignment.status === "Retrimis"
                )
                .sort((a, b) => {
                  if (a.status === "Retrimis") return -1;
                  else return 1;
                })
                .map((assignment, index) => (
                  <CodeReviewerAssignmentCard id={`sent-assignment-card-${index}`}
                    assignment={assignment}
                    buttonAction={claimAssignment}
                    buttonActionName={"Revendică"}
                  />
                ))}
            </div>
          ) : (
            <div id="no-sent-assignment-found-text">Nici o lucrare găsită</div>
          )}
        </div>
        <div className="assignment-wrapper needs-update">
          <div className="h3 px-2 assignment-wrapper-title">
            Necesită Modificări
          </div>
          {assignments &&
          assignments.filter(
            (assignment) => assignment.status === "Necesită Modificări"
          ).length > 0 ? (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
            >
              {assignments
                .filter((assignment) => assignment.status === "Necesită Modificări")
                .map((assignment, index) => (
                  <CodeReviewerAssignmentCard id={`needs-update-assignment-card-${index}`}
                    assignment={assignment}
                    buttonAction={editReview}
                    buttonActionName={"Modifică"}
                  />
                ))}
            </div>
          ) : (
            <div id="no-needs-update-assignment-found-text">Nici o lucrare găsită</div>
          )}
        </div>
      </Container>
    </>
  );
};

export default CodeReviewerDashboard;
