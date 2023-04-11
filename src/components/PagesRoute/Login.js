import React, {
  //  useContext, 
  useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/AuthSice";
import { useDispatch } from "react-redux";
import './Login.css'
import { Button } from "@mui/material";


const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setLoading] = useState(false);
  // const { LoginUserHandle } = useContext(userContext);
  const navigate = useNavigate();

  const dispatch = useDispatch();

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
      //  LoginUserHandle(responseData.idToken);
      localStorage.setItem("idToken", responseData.idToken);
      dispatch(authActions.login(responseData.idToken));
      navigate("/startingpage");
    } else {
      alert("Login failed, Please try again");
    }
  };

  return (
    <>
      <div className="form_1">
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
            {!isLoading && <Button type='submit' variant="contained">Login</Button>}
            {isLoading && <p>sending request</p>}
          </div>
          <div className="forgot_pass">
            <Link to="/forgot">Forgot password</Link>
          </div>
          <div className="forgot_pas1">
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
