import React, { useRef, useState } from "react";
import "./Forgot.css";
import { Link, useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';


const ForgotPassword = () => {
  const emailInputRef = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const redirect = useNavigate("");

  const newPasswordSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;

    try {
      setLoading(true);
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCu5UWll7yrSyYvqmDYmYLdxlWNkCixilI",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      const responseData = await response.json();
      console.log(responseData, "forgotPassword");
      if (responseData.error) {
        alert(responseData.error.message);
      } else {
        alert("Check your email inbox and reset password");
        redirect("/");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <>
      <form onSubmit={newPasswordSubmitHandler}>
        <div className="forgot">
          <div>
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              required
              ref={emailInputRef}
            />
          </div>
          <div className="already_user">
            {!isLoading && (
              <Button variant="contained" type="submit" endIcon={<SendIcon />}>
                Send Link
              </Button>
            )}

            {isLoading && <p>sending request</p>}
            <p>
              Already a user?<Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
