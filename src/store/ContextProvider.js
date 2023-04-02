import React, { useState } from "react";
import { userContext } from "./ContextStore";

const ContextProvider = (props) => {
  const initialValue = localStorage.getItem("idToken");
  const [token, setToken] = useState(initialValue);

  const LoginUserHandle = (idToken) => {
    setToken(idToken);
    localStorage.setItem("idToken", idToken);
  };

  const LogoutHandler = () => {
    setToken(null);
    localStorage.clear();
  };

  const contextValue = {
    token: token,
    LoginUserHandle: LoginUserHandle,
    LogoutHandler: LogoutHandler,
  };

  return (
    <userContext.Provider value={{ contextValue }}>
      {props.children}
    </userContext.Provider>
  );
};

export default ContextProvider;
