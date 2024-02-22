import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../UserProvider";
import { useParams } from "react-router-dom";
import {
  Button,
  Col,
  Row,
  Container,
  Form,
  DropdownButton,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
import ajax from "../Services/fetchService";

const AdminUserCreationView = () => {
  const navigate = useNavigate();
  const user = useUser();
  const { userId } = useParams();
  const [userData, setUserData] = useState({
    id: userId,
    username: "",
    authority: "",
    name: "",
    password: "",
  });
  const [authoritiesEnum, setAuthoritiesEnum] = useState([]);

  function updateUser(prop, value) {
    const newUserData = { ...userData };
    newUserData[prop] = value;
    setUserData(newUserData);
  }

  const handleSubmit = () => {
    ajax(`/api/users/${userId}`, "PUT", user.jwt, userData).then(
      (returnedUserData) => {
        setUserData(returnedUserData);
        navigate("/dashboard");
      }
    );
  };

  useEffect(() => {
    ajax(`/api/users/${userId}`, "GET", user.jwt).then((userResponse) => {
      let userData = userResponse.user;
      if (userData.username === null) userData.username = "";
      if (userData.name === null) userData.name = "";
      if (userData.password === null) userData.password = "";
      setUserData(userResponse.user);
      setAuthoritiesEnum(userResponse.authorities);
    });
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
          <Form.Group as={Row} className="my-3" controlId="username">
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
          <Form.Group as={Row} className="my-3" controlId="name">
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
          {userData.password ? (
            <></>
          ) : (
            <Form.Group as={Row} className="mb-3" controlId="password">
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
          )}

          <Form.Group as={Row} className="my-3" controlId="authorities">
            <Form.Label column sm="3" md="2">
              Rol Utilizator:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton
                as={ButtonGroup}
                variant="info"
                title={
                  userData.authority
                    ? `Rol ${userData.authority}`
                    : "Selecteaza un Rol"
                }
                onSelect={(selectedElement) => {
                  updateUser("authority", selectedElement);
                }}
              >
                {authoritiesEnum.map((authorityEnum) => (
                  <Dropdown.Item key={authorityEnum} eventKey={authorityEnum}>
                    {authorityEnum}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Form.Group>
          <div className="d-flex gap-5">
            <Button size="lg" onClick={handleSubmit}>
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

export default AdminUserCreationView;
