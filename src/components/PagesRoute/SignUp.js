import React, { useContext, useRef, useState } from "react";
import "./Login.css";

import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../store/ContextStore";

const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLoading, setLoading] = useState(false);
  const { LoginUserHandle } = useContext(userContext);
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;
    const confirmPasswordInput = confirmPasswordRef.value;

    setLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCu5UWll7yrSyYvqmDYmYLdxlWNkCixilI",
      {
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
      }
    )
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
        LoginUserHandle("token", data.idToken);
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <div className="form">
        <h4>Sign Up</h4>
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
