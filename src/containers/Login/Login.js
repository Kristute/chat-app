import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useLoggedIn from "../../hooks/useLoggedIn";
import LoginForm from "./LoginForm";

export default function Login() {
  let history = useHistory();
  const { loggedIn, login } = useLoggedIn();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (loggedIn) history.push("/chat");
  }, [loggedIn, history]);

  const initiateLogin = async (email, password) => {
    try {
      await login(email, password);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="container centered">
      <div className="row">
        <div className="col-sm-12 col-md-6 m-auto">
          <div className="card card-block">
            <div className="card-body">
              <h2 className="text-center mb-3">Login</h2>
              {error && (
                <Alert variant="danger">
                  Login was unsuccessful. Please try again.
                </Alert>
              )}
              <LoginForm initiateLogin={initiateLogin} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
