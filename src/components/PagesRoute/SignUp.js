import React, { useContext, useRef, useState } from "react";
import "./SignUp.css";

import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../store/ContextStore";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthSice";
import { Button } from "@mui/material";

const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const { LoginUserHandle } = useContext(userContext);
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;
    const confirmPasswordInput = confirmPasswordRef.value;
    console.log(confirmPasswordInput);
    setLoading(true);
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCu5UWll7yrSyYvqmDYmYLdxlWNkCixilI",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    const tokenLogin = !!responseData.idToken;
    if (tokenLogin) {
      setLoading(false);
      alert("signUp successfull");
      // LoginUserHandle(responseData.idToken);
      dispatch(authActions.login(responseData.idToken));
      localStorage.setItem("idToken", responseData.idToken);
      navigate("/");
    }
  };

  return (
    <>
      <div className="signUpForm">
        <h4>Sign Up</h4>
        <form onSubmit={submitHandler}>
          <div className="form-control_1">
            <input
              type="email"
              placeholder="Email"
              required
              ref={emailInputRef}
            />
          </div>
          <div className="form-control_1">
            <input
              type="password"
              placeholder="Password"
              required
              ref={passwordInputRef}
            />
          </div>

          <div className="form-control_1">
            <input
              type="password"
              placeholder="Confirm-Password"
              id="inputPassword"
              required
              ref={confirmPasswordRef}
            />
          </div>

          <div className="btn-bor">
            {isLoading && <p>sending request.......</p>}

            {!isLoading && (
              <div className="signUpbtn">
                <Button type="submit" variant="contained">
                  SignUp
                </Button>
              </div>
            )}
          </div>
          <div>
            <p>
              Already have an account ?<Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
