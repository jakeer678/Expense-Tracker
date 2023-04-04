import React, { useContext, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../store/ContextStore";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLoading, setLoading] = useState(false);
  const { LoginUserHandle } = useContext(userContext);
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setLoading(true);
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCu5UWll7yrSyYvqmDYmYLdxlWNkCixilI",

      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();
    console.log(responseData, "kkkkkkk");
    const token = !!responseData.idToken;
    if (token) {
      setLoading(false);
      alert("Login successful");
      LoginUserHandle(responseData.idToken);
      navigate("/startingpage");
    } else {
      alert("Login failed, Please try again");
    }
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
