import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useUser } from '../UserProvider';
import { useParams } from "react-router-dom";
import { Button, Col, Row, Container, Form, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import ajax from '../Services/fetchService';

const AdminUserCreationView = () => {

  const navigate = useNavigate();
  const user = useUser();
  const { userId } = useParams();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    authorities: [],
    name: "",
  });
  const [authoritiesEnum, setAuthoritiesEnum] = useState([]);

  function updateUser(prop, value) {
    const newUserData = { ...userData };
    if (prop === "authorities") {
      if (newUserData.authorities.length > 0) {
        newUserData.authorities = [];
      }
      newUserData.authorities.push(value);
      console.log(newUserData.authorities[0]);
    } 
    newUserData[prop] = value;
    setUserData(newUserData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your backend logic to create a user here
    // Example: Call an API to create a user
    // replace 'yourApiEndpoint' with the actual endpoint
    // replace 'yourApiKey' with any authentication token or header required
    fetch('yourApiEndpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers here
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or error based on the response
        console.log('User created successfully:', data);
        // Redirect to the user management page or any desired location
        navigate('/user-management');
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  useEffect(() => {
    ajax(`/api/users/${userId}`, "GET", user.jwt).then(
      (userResponse) => {
        let userData = userResponse.user;
        if (userData.username === null) userData.username = "";
        if (userData.name === null) userData.name = "";
        if (userData.password === null) userData.password = "";
        setUserData(userResponse.user);
        setAuthoritiesEnum(userResponse.authorities);
      }
    );
  }, []);
  
  useEffect(() => {
    console.log(userData);
    console.log(authoritiesEnum);
  }, [userData]);

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          <h1>Create User </h1>
        </Col>
      </Row>
      {userData ? (
        <>
          <Form.Group as={Row} className="my-3" controlId="githubUrl">
            <Form.Label column sm="3" md="2">
              Nume Utilizator:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
                placeholder="mihaifratila"
                onChange={(e) => updateUser("username", e.target.value)}
                value={userData.username}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="githubUrl">
            <Form.Label column sm="3" md="2">
              Nume Complet:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
                placeholder="Mihai Fratila"
                onChange={(e) => updateUser("name", e.target.value)}
                value={userData.name}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="gitHubBranch">
            <Form.Label column sm="3" md="2">
              Parola:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
                placeholder="%$#@!kfdsifs^%a421"
                onChange={(e) => updateUser("password", e.target.value)}
                value={userData.password}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="assignmentName">
            <Form.Label column sm="3" md="2">
              Rol Utilizator:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton
                as={ButtonGroup}
                variant="info"
                title={
                  userData.authorities[0]
                    ? `Rol ${userData.authorities}`
                    : "Selecteaza un Rol"
                }
                onSelect={(selectedElement) => {
                  updateUser("authorities", selectedElement);
                }}
              >
                {authoritiesEnum.map((authorityEnum) => (
                  <Dropdown.Item
                    key={authorityEnum}
                    eventKey={authorityEnum}
                  >
                    {authorityEnum}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Form.Group>
          <div className="d-flex gap-5">
              <Button
                size="lg"
                onClick={() => {console.log("Salvez utilizatorul!")}}
              >
                Creaza Utilizator
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/dashboard")}
              >
                Back
              </Button>
            </div>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default AdminUserCreationView