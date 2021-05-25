import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isLoggedIn } from "./api/sessionStorage";

export default function PrivateRoute({ path, exact, component }) {
  const condition = isLoggedIn();

  return condition ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to="/" />
  );
}
