import React, { useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");

  const [jwt, setJwt] = useLocalState("", "jwt");

  console.log(username);
  function sendLoginRequest() {
    const reqBody = {
      username: username,
      password: password,
    };

    fetch("api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200)
          return Promise.all([response.json(), response.headers]);
        else return Promise.reject("Invalid login attempt");
      })
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        window.location.href = "dashboard";
      })
      .catch((message) => {
        alert(message);
      });
  }

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md="6">
        <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fs-4">Username </Form.Label>
              <Form.Control
                placeholder="joe@example.com"
                size="lg"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
        </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="6">
        <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fs-4">Password</Form.Label>
              <Form.Control
                placeholder="Enter your password"
                size="lg"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
          </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col
           md="8"
           lg="6"
           className="mt-2 d-flex flex-column gap-5 flex-md-row justify-content-md-between">
              <Button
                size="lg"
                id="submit"
                type="button"
                onClick={() => sendLoginRequest()}
              >
                Login
              </Button>
              <Button
                variant="secondary"
                size="lg"
                id="submit"
                type="button"
                onClick={() => {
                  window.location.href = "/"
                }}
              >
                Exit
              </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
