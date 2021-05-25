import React, { useState, useEffect } from "react";
import { getUsers, addNewUser } from "../../api/users";
import { getMessages, addNewMessage } from "../../api/messages";
import Sidebar from "./Sidebar";
import Box from "./Box";

export default function Chat() {
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeMessages, setActiveMessages] = useState([]);

  useEffect(() => {
    getUsers()
      .then((usersResult) => {
        setUsers(usersResult);
        setCurrentUser(usersResult[0]);

        return usersResult;
      })
      .then((users) => {
        getMessages(users[0]).then((messages) => {
          setActiveMessages(messages);
        });
      });
  }, []);

  const changeUser = async (user) => {
    setCurrentUser(user);
    setActiveMessages([]);
    setLoading(true);
    const messages = await getMessages(user);
    setActiveMessages(messages);
    setLoading(false);
  };

  const sendMessage = async (message) => {
    const time = new Date().getTime();
    setActiveMessages([
      ...activeMessages,
      {
        message,
        time,
        notSent: true,
      },
    ]);

    try {
      const results = await addNewMessage(message, currentUser);

      if (results.user) {
        setActiveMessages(results.messages);
        setCurrentUser(results.user);
        const updatedUsers = users.map((currentUser) =>
          currentUser.id === results.user.id ? results.user : currentUser
        );
        setUsers(updatedUsers);
      } else {
        setActiveMessages(results);
      }
    } catch (error) {
      setActiveMessages([
        ...activeMessages,
        {
          message,
          time,
          error: true,
        },
      ]);
    }

    
  };

  const addNewChat = async (email) => {
    const updatedUserList = await addNewUser(email);
    setCurrentUser(updatedUserList.find((user) => user.email === email));
    setUsers(updatedUserList);
    setActiveMessages([]);
  };

  return (
    <div className="container centered">
      <div className="row">
        <div className="col-12 m-auto">
          <div className="card chat">
            <div className="row no-gutters">
              <Sidebar
                users={users}
                loading={loading}
                activeUser={currentUser}
                changeUser={changeUser}
                addNewChat={addNewChat}
              />
              <Box
                messages={activeMessages}
                activeUser={currentUser}
                sendMessage={sendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
