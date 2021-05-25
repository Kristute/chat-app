import React from "react";
import { Nav, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getUserInfo } from "../../api/sessionStorage";
import useLoggedIn from "../../hooks/useLoggedIn";
import { ReactComponent as Avatar1 } from "../../assets/images/avatar1.svg";
import { ReactComponent as LogoutIcon } from "../../assets/images/logout.svg";

export default function UserMenu() {
  let history = useHistory();
  let { loggedIn, logout } = useLoggedIn();
  const goToProfile = () => history.push("/profile");

  return loggedIn ? (
    <Nav className="justify-content-end px-1 p-md-3">
      <Nav.Item className="logout-wrapper">
        <Button className="bg-alt my-md-2" onClick={logout}>
          <span className="d-none d-md-block">Logout</span>
          <LogoutIcon className="logout d-md-none" />
        </Button>
      </Nav.Item>
      <Nav.Item className="profile">
        <Button className="profile-link" variant="link" onClick={goToProfile}>
          <Avatar1 className="chat-avatar mr-md-3" />
          <span className="d-none d-md-block">{getUserInfo().email}</span>
        </Button>
      </Nav.Item>
    </Nav>
  ) : null;
}
