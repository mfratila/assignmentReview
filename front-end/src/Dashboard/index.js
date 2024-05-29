import React, { useEffect, useState } from "react";
import ajax from "../Services/fetchService";
import { Button, Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";
import NavigationBar from "../Navbar";
import StudentAssignmentCard from "../StudentAssignmentCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useUser();
  const [assignments, setAssignments] = useState([]);
  const [assignmentEnums, setAssignmentEnums] = useState([]);

  useEffect(() => {
    ajax("api/assignments", "GET", user.jwt).then((assignmentsData) => {
      setAssignments(assignmentsData.assignments);
      setAssignmentEnums(assignmentsData.assignmentEnums);
    });
  }, []);

  function createAssignment() {
    ajax("/api/assignments", "POST", user.jwt).then((assignment) => {
      navigate(`/assignments/${assignment.id}`);
    });
  }

  return (
    <>
      <NavigationBar id="studentNavigationBar" />
      <Container style={{ margin: "2em" }}>
        <Row className="mb-4">
          <Col className="text-center">
            <h1 id="page-title">Tabel de Bord Student</h1>
            <hr />
          </Col>
        </Row>
        {assignments.length < 14 ? (
          <div className="mb-4">
            <Button
              id="createAssignmentBtn"
              size="lg"
              onClick={() => createAssignment()}
            >
              Trimite o nouă temă
            </Button>
          </div>
        ) : (
          <></>
        )}

        {assignments ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
          >
            {assignments.map((assignment) => (
              <StudentAssignmentCard
                key={assignment.id}
                id={`studentAssignmentCard-${assignment.number}`}
                assignment={assignment}
              />
            ))}
          </div>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
