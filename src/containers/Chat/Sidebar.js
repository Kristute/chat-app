import React, { useRef, useCallback } from "react";
import UserMenu from "../Shared/UserMenu";
import { Col, ListGroup, Button, Form } from "react-bootstrap";
import uniqid from "uniqid";

import UserListItem from "./UserListItem";

export default function Sidebar({ users, activeUser, changeUser, addNewChat, loading}) {
  const emailInputRef = useRef(null);
  const add = useCallback(
    (event) => {
      event.preventDefault();
      addNewChat(emailInputRef.current.value);
    },
    [addNewChat]
  );
  return (
    <div className="col-3 col-md-4">
      <div className="users-container">
        <UserMenu />
        <ListGroup className="users">
          {users.map((user) => (
            <UserListItem
              active={activeUser.id === user.id}
              loading={loading}
              user={user}
              changeUser={changeUser}
              key={uniqid()}
            />
          ))}
        </ListGroup>
        <Col className="my-3 d-none d-md-block">
          <Form onSubmit={add}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control autoFocus type="email" ref={emailInputRef} required />
            </Form.Group>
            <Button block size="lg" type="submit" className="btn-sec mt-5">
              Start new chat
            </Button>
          </Form>
        </Col>
      </div>
    </div>
  );
}
