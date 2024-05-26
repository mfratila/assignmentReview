import React from 'react'
import StatusBadge from "../StatusBadge";
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StudentAssignmentCard = ({id, assignment, assignmentName}) => {

    const navigate = useNavigate();

    return (
        <>
            <Card id = {id} key={assignment.id} style={{ width: "18rem" }}>
                <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title id='card-title'>Assignment #{assignment.number}</Card.Title>
                    <Card.Subtitle id='card-subtitle' className="mb-2 text-muted">
                        {assignmentName}
                    </Card.Subtitle>
                    <div className="d-flex align-items-start">
                        <StatusBadge id='status-badge' text={assignment.status}></StatusBadge>
                    </div>
                    <Card.Text id='status-badge'>
                        Some quick example text to build on the card title and make
                        up the bulk of the card's content.
                    </Card.Text>
                    <Card.Text id='github-url-text' style={{ marginTop: "1em" }}>
                            <b>GitHub URL:</b> {assignment.githubUrl}
                        </Card.Text>
                        <Card.Text d='branch-text' style={{ marginTop: "1em" }}>
                        <b>Branch:</b> {assignment.branch}
                        </Card.Text>
                    <Button id='navigate-to-assignment-btn'
                        variant="secondary"
                        onClick={() => {
                            navigate(`/assignments/${assignment.id}`);
                        }}
                    >
                        Edit
                    </Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default StudentAssignmentCard