import React, { useContext, useRef, useState } from "react";
import "./Login.css";
import { userContext } from "../store/ContextStore";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const { loginUser } = useContext(userContext);

  const switchHandler = () => {
    setIsLogin((prev) => !prev);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;
    const confirmPasswordInput = confirmPasswordRef.value;

    let url;
    setLoading(true);
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvirhZX02ctqALrptP_Fqszb0mU3ImjhA";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvirhZX02ctqALrptP_Fqszb0mU3ImjhA";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
        confirmPassword: confirmPasswordInput,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = "Login Authentication failed";
            alert(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        alert("sucess");
        loginUser(data.idToken);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <div className="form">
        <h4>{isLogin ? "Login" : "SignUp"}</h4>
        <form onSubmit={submitHandler}>
          <div>
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              required
              ref={emailInputRef}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              required
              ref={passwordInputRef}
            />
          </div>
          {!isLogin && (
            <div>
              <input
                type="password"
                placeholder="Confirm-Password"
                className="form-control"
                id="inputPassword"
                required
                ref={confirmPasswordRef}
              />
            </div>
          )}
          <div className="btn-bor">
            {!isLoading && <button>{isLogin ? "login" : "SignUp"}</button>}

            {isLoading && <p>sending request.......</p>}

            <button type="button" className="" onClick={switchHandler}>
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
