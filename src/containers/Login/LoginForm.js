import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function LoginForm({ initiateLogin }) {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [validForm, setValidForm] = useState(false);

  const validateForm = () => {
    if (!!emailInputRef.current.value && !!passwordInputRef.current.value)
      setValidForm(true);
    else setValidForm(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    initiateLogin(emailInputRef.current.value, passwordInputRef.current.value);
  };

  return (
    <div className="Login">
      <Form onSubmit={onSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            ref={emailInputRef}
            onChange={validateForm}
            required
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            ref={passwordInputRef}
            onChange={validateForm}
            required
          />
        </Form.Group>
        <Button
          block
          size="lg"
          type="submit"
          className="btn-sec mt-5"
          disabled={!validForm}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}
