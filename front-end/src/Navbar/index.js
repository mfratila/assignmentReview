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
          <Navbar.Brand>Navbar</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link href="/">Acasa</Nav.Link>
          <Nav.Link href="/dashboard">Tabel de Bord</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Button
                variant="secondary"
                onClick={() => {
                  user.setJwt(null);
                  navigate("/login");
                }}
              >
                Logout
              </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavigationBar