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

    // Helper function to get assignment name based on assignmentNum
    const getAssignmentName = (assignmentNum) => {
      const matchingEnum = assignmentEnums.find((enumItem) => enumItem.assignmentNum === assignmentNum);
      return matchingEnum ? matchingEnum.assignmentName : 'Unknown Assignment';
    };

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
              <StudentAssignmentCard assignment={assignment} assignmentName={getAssignmentName(assignment.number)} />
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
