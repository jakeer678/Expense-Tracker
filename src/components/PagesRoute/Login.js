import React, { useContext, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../store/ContextStore";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLoading, setLoading] = useState(false);
  const { LoginUserHandle } = useContext(userContext);
  const navigate = useNavigate();
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCu5UWll7yrSyYvqmDYmYLdxlWNkCixilI",

      {
        method: "POST",
        body: JSON.stringify({
          emai: enteredEmail,
          password: enteredPassword,
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
        LoginUserHandle(data.idToken);
        navigate("/startingpage");
        console.log(data.idToken, "jakkkkkke");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <div className="form">
        <h4>Login</h4>
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
            {!isLoading && <button type="submit">Login</button>}
            {isLoading && <p>sending request</p>}
          </div>
          <div>
            <Link to="/forgot">Forgot password</Link>
          </div>
          <div>
            <p>
              Don't have an account ? <Link to="/signup">SignUp</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
