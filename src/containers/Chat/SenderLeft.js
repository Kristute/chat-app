import React from "react";
import { Badge } from "react-bootstrap";
import { ReactComponent as Avatar2 } from "../../assets/images/avatar2.svg";

export default function SenderLeft({ message, email }) {
  return (
    <li className={`chat-row chat-${message.received ? "left" : "right"}`}>
      <div className="chat-avatar">
        <Avatar2 />
        <div className="chat-name">{email}</div>
      </div>
      <div className="chat-text">
        {message.notSent && <Badge variant="secondary">Sending</Badge>}{" "}
        {message.message}
      </div>
      <div className="chat-hour">
        {new Date(message.time).toLocaleTimeString()}{" "}
        <span className="fa fa-check-circle"></span>
      </div>
    </li>
  );
}
