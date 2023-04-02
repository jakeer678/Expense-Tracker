import React, { useState } from "react";
import { userContext } from "./ContextStore";

const ContextProvider = (props) => {
  const initialValue = localStorage.getItem("idToken");
  const [token, setToken] = useState(initialValue);
    
  const LoginUserHandle = (idToken) => {
    setToken(idToken);
    localStorage.setItem("idToken", idToken)
  };

  return (
    <userContext.Provider value={{ LoginUserHandle }}>
      {props.children}
    </userContext.Provider>
  );
};

export default ContextProvider;
