import React from "react";
import { NavLink } from "react-router-dom";

const StartingPage = () => {
  return (
    <>
      <div>
        <h1>welcome to Expense Tracker</h1>
        <p>Your profile is incomplete. <NavLink to="/contactdetails">complete now</NavLink> </p>
      </div>
    </>
  );
};

export default StartingPage;
