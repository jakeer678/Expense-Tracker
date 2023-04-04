import React, { useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import { userContext } from "../../store/ContextStore";

const StartingPage = () => {
  const { token } = useContext(userContext);

  const verifyEmailSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCu5UWll7yrSyYvqmDYmYLdxlWNkCixilI",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = response.json();
    console.log(responseData, "verifyemail");
  };

  return (
    <>
      <div>
        <h1>welcome to Expense Tracker</h1>
        <form onSubmit={verifyEmailSubmitHandler}>
          <button>Verify Your Email id</button>
        </form>

        <p>
          Your profile is incomplete.
          <NavLink to="/contactdetails">complete now</NavLink>{" "}
        </p>
      </div>
    </>
  );
};

export default StartingPage;
