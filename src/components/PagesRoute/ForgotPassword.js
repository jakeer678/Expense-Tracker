import React, { useRef, useState } from "react";
import "./Forgot.css";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const emailInputRef = useRef();
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const newPasswordSubmitHandler = async (e) => {
    e.preventDefaut();
    const enteredEmail = emailInputRef.current.value;
    setLoading(true);
    try {
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
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={newPasswordSubmitHandler}>
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
            {!isLoading && <button type="submit">Send Link</button>}
            {isLoading && <p>sending request</p>}
            <p>
              Already a user?<Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
