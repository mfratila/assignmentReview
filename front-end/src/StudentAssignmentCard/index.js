import React from 'react'
import StatusBadge from "../StatusBadge";
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StudentAssignmentCard = ({assignment}) => {

    const navigate = useNavigate();

    return (
        <>
            <Card key={assignment.id} style={{ width: "18rem" }}>
                <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        Card Subtitle
                    </Card.Subtitle>
                    <div className="d-flex align-items-start">
                        <StatusBadge text={assignment.status}></StatusBadge>
                    </div>
                    <Card.Text>
                        Some quick example text to build on the card title and make
                        up the bulk of the card's content.
                    </Card.Text>
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