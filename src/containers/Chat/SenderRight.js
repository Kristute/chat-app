import React from "react";
import { Badge } from "react-bootstrap";
import { ReactComponent as Avatar1 } from "../../assets/images/avatar1.svg";

export default function SenderRight({ message }) {
  return (
    <li className={`chat-row chat-${message.received ? "left" : "right"}`}>
      <div className="chat-hour">
        {new Date(message.time).toLocaleTimeString()}{" "}
        <span className="fa fa-check-circle"></span>
      </div>
      <div className="chat-text">
        {message.notSent && <Badge variant="secondary">Sending</Badge>}{" "}
        {message.error && <Badge variant="danger">Failed</Badge>}{" "}
        {message.message}
      </div>
      <div className="chat-avatar">
        <Avatar1 />
        <div className="chat-name">Me</div>
      </div>
    </li>
  );
}
