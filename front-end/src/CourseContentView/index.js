import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import * as data from '../CourseData/projectDetails.js';
import NavigationBar from '../Navbar/index.js';

function DetailedInfo() {

    const navigate = useNavigate();
    let { id } = useParams();
    const project = data.projectDetails.find(p => p.id === parseInt(id));

    if (!project) {
        return <div>Proiectul nu a fost găsit.</div>;
    }

    function handleBack() {
        navigate('/materiale-didactice');
    }

    function handleNext() {
        let nextId = parseInt(id) + 1;
            navigate(`/materiale-didactice/${nextId}`);
    }

    return (
        <>
        <NavigationBar />
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Header as="h5">Lucrararea {id} - {project.title}</Card.Header>
                        <Card.Body>
                            <Card.Title>Descriere</Card.Title>
                            <Card.Text>{project.description}</Card.Text>
                            <Card.Title>Scopul Lucrării</Card.Title>
                            <Card.Text>{project.purpose}</Card.Text>
                            <Card.Title>Pasi de urmat</Card.Title>
                            <ul>
                                {project.steps.map((step, index) => {
                                    return <li><Card.Text key={index}>{step}</Card.Text></li>
                                })
                                }
                            </ul>
                            <div className='d-flex justify-content-between'>
                                <Button variant="secondary" onClick={handleBack} >Mergi Inapoi</Button>
                                {
                                    id < 14 ? (<Button variant="primary" onClick={handleNext} >Mergi la Urmatorul</Button>) : (<></>)
                                }
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default DetailedInfo;
