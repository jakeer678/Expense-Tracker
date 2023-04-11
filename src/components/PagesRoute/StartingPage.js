import React, {
  useContext,
  // useRef
} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../store/ContextStore";
import { Button } from "@mui/material";
import "./StartingPage.css";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";

const StartingPage = () => {
  // const { token } = useContext(userContext);
  const token = useSelector((state) => state.auth.idToken);
  const redirect = useNavigate("");
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
    alert("Email verified successfully and check your Email Inbox");
    const responseData = response.json();
    redirect("/");
    console.log(responseData, "verifyemail");
  };

  return (
    <>
      <div className="verify_page">
        <h2>Welcome to Expense Tracker</h2>

        <Button
          variant="contained"
          color="secondary"
          onClick={verifyEmailSubmitHandler}
        >
          Verify Your Email id
        </Button>

        <p>
          Your profile is Incomplete------
          <Button variant="contained" color="warning" endIcon={<SendIcon />}>
            <NavLink to="/contactdetails" className="complete_profile">
              complete now
            </NavLink>
          </Button>
        </p>
      </div>
    </>
  );
};

export default StartingPage;
