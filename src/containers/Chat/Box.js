import { Button } from "react-bootstrap";
import React, { useRef, useCallback, useEffect } from "react";
import SenderRight from "./SenderRight";
import SenderLeft from "./SenderLeft";

export default function Box({ messages, sendMessage, activeUser }) {
  const messageInputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const send = useCallback(() => {
    sendMessage(messageInputRef.current.value);
  }, [sendMessage]);
  const sender = activeUser.email?.split('@')[0]

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages])
  
  return (
    <div className="chat-wrapper col-9 col-md-8">
      <div className="selected-user">
        <span>
          To: <span className="name font-weight-bold">{activeUser.email}</span>
        </span>
      </div>
      <div className="chat-container">
        <ul className="chat-box chatContainerScroll" ref={chatBoxRef}>
          {messages.map((message) =>
            message.received ? (
              <SenderLeft
                message={message}
                email={sender}
                key={`${message.time}${activeUser.email}`}
              />
            ) : (
              <SenderRight
                message={message}
                key={`${message.time}${activeUser.email}`}
              />
            )
          )}
        </ul>
        <div className="form-group d-md-flex mt-3 mb-0">
          <textarea
            className="form-control mb-3 mb-md-0"
            rows="3"
            placeholder="Type your message here..."
            ref={messageInputRef}
          ></textarea>
          <Button className="btn-sec btn-md-lg ml-md-2 btn-mob" onClick={send}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
