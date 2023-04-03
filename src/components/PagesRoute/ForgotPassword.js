import React, { useRef } from "react";
import "./Forgot.css";

const ForgotPassword = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const newPasswordSubmitHandler = () => {};
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
            <input
              type="password"
              placeholder="New-Password"
              className="form-control"
              required
              ref={passwordInputRef}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="confirm New-Password"
              className="form-control"
              required
              ref={passwordInputRef}
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
