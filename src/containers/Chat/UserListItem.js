import React, { useCallback } from "react";
import { ListGroup } from "react-bootstrap";
import { ReactComponent as Avatar3 } from "../../assets/images/avatar3.svg";

export default function UserListItem({ user, active, changeUser, loading }) {
  const change = useCallback(() => {
    if(!loading) changeUser(user);
  }, [user, changeUser, loading]);
  return (
    <ListGroup.Item
      className={`person${active ? " active" : ""} ${loading ? " disabled" : ""}`}
      onClick={change}
    >
      <Avatar3 className="chat-avatar mr-md-3" />
      <p className="name">{user.email}</p>
    </ListGroup.Item>
  );
}
