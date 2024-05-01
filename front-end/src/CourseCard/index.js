import React from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function CourseCard({ cardData }) {

    const navigate = useNavigate();

    function handleAccess() {
        navigate(`/materiale-didactice/${cardData.id}`);
    }

    return (
        <Card style={{ width: '18rem', margin: 'auto' }}>
            <Card.Body className="text-center">
                <Card.Title>{cardData.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {cardData.subtitle}
                </Card.Subtitle>    
                <Card.Text>
                    {cardData.description}
                </Card.Text>
                <Button variant="primary" onClick={handleAccess}>Acceseaza</Button>
            </Card.Body>
        </Card>
    );
}

export default CourseCard;