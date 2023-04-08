import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { userContext } from "../../store/ContextStore";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthSice";

const Navbar = () => {
  const { isLoggedIn, LogoutHandler } = useContext(userContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    // LogoutHandler();
    dispatch(authActions.logout);
    navigate("/login");
  };
  return (
    <div>
      <ul className="header">
        {isLoggedIn && (
          <li>
            <NavLink to="/startingpage">Home</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/expenses">Expenses</NavLink>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={logout}>
              <NavLink to="/login">Logout</NavLink>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
