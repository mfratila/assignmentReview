import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserProvider';

const NavigationBar = () => {

    const navigate = useNavigate();
    const user = useUser();

  return (
    <>
        <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand><b>EasyClass</b></Navbar.Brand>
          <Nav className="me-auto me-5">
          <Nav.Link href="/">Acasa</Nav.Link>
          <Nav.Link href="/dashboard">Tabel de Bord</Nav.Link>
          <Nav.Link href="/materiale-didactice">Suport Teoretic Lucrări</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {user.jwt !== null ? (
              <Button
                variant="secondary"
                onClick={() => {
                  user.setJwt(null);
                  navigate("/login");
                }}
              >
                Logout
              </Button>) : (
                <Button
                variant="secondary"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              )}
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavigationBar