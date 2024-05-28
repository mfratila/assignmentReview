import React from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function CourseCard({ id, cardData }) {

    const navigate = useNavigate();

    function handleAccess() {
        navigate(`/materiale-didactice/${cardData.id}`);
    }

    return (
        <Card id={id} style={{ width: '18rem', margin: 'auto' }}>
            <Card.Body className="text-center">
                <Card.Title id='card-title'>{cardData.title}</Card.Title>
                <Card.Subtitle id='card-subtitle' className="mb-2 text-muted">
                    {cardData.subtitle}
                </Card.Subtitle>    
                <Card.Text id='card-text'>
                    {cardData.description}
                </Card.Text>
                <Button id='navigate-to-course-btn' variant="primary" onClick={handleAccess}>Accesează</Button>
            </Card.Body>
        </Card>
    );
}

export default CourseCard;