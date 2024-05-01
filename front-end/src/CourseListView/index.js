import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CourseCard from '../CourseCard';
import NavigationBar from '../Navbar';
import * as data from '../CourseData/cardsInfo.js';

function CourseListView() {

    return (
        <>
            <NavigationBar />
            <Container style={{marginTop: '2em'}}>
                <Row>
                    {data.cardsInfo.map((card, index) => (
                        <Col className='mb-4' key={index} sm={12} md={6} lg={4} xl={3}>
                            <CourseCard cardData={card} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default CourseListView;