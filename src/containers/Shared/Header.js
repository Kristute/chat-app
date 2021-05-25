import React from "react";
import { Navbar } from "react-bootstrap";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/" className="logo mr-auto">
        <Logo />
        ChatApp
      </Navbar.Brand>
    </Navbar>
  );
}
