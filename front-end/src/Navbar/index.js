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
          <Navbar.Brand id='navbar-brand'><b>EasyClass</b></Navbar.Brand>
          <Nav className="me-auto me-5">
          <Nav.Link id='navbar-home-link' href="/">Acasa</Nav.Link>
          <Nav.Link id='navbar-dashboard-link' href="/dashboard">Tabel de Bord</Nav.Link>
          <Nav.Link id='navbar-theoretical-courses-link' href="/materiale-didactice">Suport Teoretic Lucrări</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {user.jwt !== null ? (
              <Button id ='navbar-logout-btn'
                variant="secondary"
                onClick={() => {
                  user.setJwt(null);
                  navigate("/login");
                }}
              >
                Logout
              </Button>) : (
                <Button id='navbar-login-btn'
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