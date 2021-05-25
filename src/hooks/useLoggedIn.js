import { useState } from "react";
import { useHistory } from "react-router-dom";
import { isLoggedIn, removeUserInfo, setUserInfo } from "../api/sessionStorage";

export default function useLoggedIn() {
  let history = useHistory();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  const logout = () => {
    removeUserInfo();
    setLoggedIn(false);
    history.push("/");
  };

  const login = async (email, password) => {
    await setUserInfo(email, password);
    setLoggedIn(true);
    history.push("/chat");
  };

  return { loggedIn, login, logout };
}
