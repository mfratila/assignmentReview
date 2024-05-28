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
  });
  const [authoritiesEnum, setAuthoritiesEnum] = useState([]);

  function updateUser(prop, value) {
    const newUserData = { ...userData };
    newUserData[prop] = value;
    setUserData(newUserData);
  }

  const handleSubmit = () => {
    ajax(`/api/users//existing/${userId}`, "PUT", user.jwt, userData).then(
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
      setUserData(userResponse.user);
      setAuthoritiesEnum(userResponse.authorities);
    });
  }, []);

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          <h1 id="user-creation-title" >Create User </h1>
        </Col>
      </Row>
      {userData ? (
        <>
          <Form.Group as={Row} className="my-3" controlId="email-input">
            <Form.Label id="username-form-label" column sm="3" md="2">
              Email Utilizator:
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
          <Form.Group as={Row} className="my-3" controlId="fullname-input">
            <Form.Label id="fullname-form-label" column sm="3" md="2">
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

          <Form.Group as={Row} className="my-3" controlId="authorities-input">
            <Form.Label id="role-form-label" column sm="3" md="2">
              Rol Utilizator:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton id="roles-dropdown-btn"
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
                {authoritiesEnum.map((authorityEnum, index) => (
                  <Dropdown.Item id={`role-dropdown-selection-${index}`} key={authorityEnum} eventKey={authorityEnum}>
                    {authorityEnum}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Form.Group>
          <div className="d-flex gap-5">
            <Button id="confirm-create-user-btn" size="lg" onClick={handleSubmit}>
              Modifică Utilizator
            </Button>
            <Button id="back-btn"
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
