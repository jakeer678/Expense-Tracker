import React, { useContext, useRef, useState } from "react";
import "./SignUp.css";

import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../store/ContextStore";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthSice";

const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch()
  // const { LoginUserHandle } = useContext(userContext);
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;
    const confirmPasswordInput = confirmPasswordRef.value;
    setLoading(true)
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCu5UWll7yrSyYvqmDYmYLdxlWNkCixilI",
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
      setLoading(false)
      alert("signUp successfull");
      // LoginUserHandle(responseData.idToken);
      dispatch(authActions.login(responseData.idToken))
      localStorage.setItem('idToken',responseData.idToken)
      navigate("/login");
    }
  };

  return (
    <>
      <div className="form">
        <h4>Sign Up</h4>
        <form onSubmit={submitHandler}>
          <div>
            <labe>Email</labe>
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              required
              ref={emailInputRef}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              required
              ref={passwordInputRef}
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm-Password"
              className="form-control"
              id="inputPassword"
              required
              ref={confirmPasswordRef}
            />
          </div>

          <div className="btn-bor">
            {isLoading && <p>sending request.......</p>}

            {!isLoading && (
              <button type="submit" className="">
                Sign Up
              </button>
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
