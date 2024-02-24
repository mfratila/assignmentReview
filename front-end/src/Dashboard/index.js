import React, { useEffect, useState } from "react";
import ajax from "../Services/fetchService";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";
import NavigationBar from "../Navbar";
import StudentAssignmentCard from "../StudentAssignmentCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useUser();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    ajax("api/assignments", "GET", user.jwt).then((assignmentsData) => {
      setAssignments(assignmentsData);
    });
  }, []);

  function createAssignment() {
    ajax("/api/assignments", "POST", user.jwt).then((assignment) => {
      navigate(`/assignments/${assignment.id}`);
    });
  }

  return (
    <>
    <NavigationBar />
      <div style={{ margin: "2em" }}>
        <Row>
          <Col>
          </Col>
        </Row>
        {assignments.length < 14 ? (
          <div className="mb-4">
            <Button size="lg" onClick={() => createAssignment()}>
              Submit New Assignment
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
              <StudentAssignmentCard assignment={assignment} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Dashboard;
