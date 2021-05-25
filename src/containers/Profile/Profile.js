import React, { useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { getUserInfo, updateUserInfo } from "../../api/sessionStorage";
import { useHistory } from "react-router-dom";
import useLoggedIn from "../../hooks/useLoggedIn";
import { ReactComponent as Avatar1 } from "../../assets/images/avatar1.svg";

export default function Profile() {
  let history = useHistory();
  const { logout } = useLoggedIn();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState(getUserInfo().email);
  const goToMessages = () => history.push("/chat");
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUserInfo(
        emailInputRef.current.value,
        passwordInputRef.current.value
      );
      setError(false);
      setEmail(emailInputRef.current.value);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Container className="centered">
      <Row>
        <Col lg="4" className="mb-3">
          <Card className="d-flex flex-column align-items-center text-center">
            <Card.Body>
              <Avatar1 className="account-image" />
              <Card.Title className="mt-3">{email}</Card.Title>
              <Card.Text>
                <Button
                  className="btn btn-sec text-white px-4 mr-2"
                  type="submit"
                  onClick={goToMessages}
                >
                  Messages
                </Button>
                <Button
                  className="btn bg-alt text-white px-4"
                  type="submit"
                  onClick={logout}
                >
                  Logout
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="8">
          <Card>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && (
              <Alert variant="success">Information updated successfully!</Alert>
            )}
            <Form className="m-3" onSubmit={onSubmit}>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    defaultValue={getUserInfo().email}
                    type="email"
                    ref={emailInputRef}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    ref={passwordInputRef}
                  />
                </Col>
              </Form.Group>
              <Col className="text-right pr-0">
                <Button className="btn btn-sec text-white px-4" type="submit">
                  Save Changes
                </Button>
              </Col>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>)
}
