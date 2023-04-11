import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { userContext } from "../../store/ContextStore";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/AuthSice";
import Button from "@mui/material/Button";

const Navbar = () => {
  // const { isLoggedIn, LogoutHandler } = useContext(userContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.idToken);
  console.log(isLoggedIn, "uuuuuuuu");
  const logout = () => {
    // LogoutHandler();
    dispatch(authActions.logout());
    navigate("/login");
  };
  return (
    <div>
      <ul className="header">
        {isLoggedIn && (
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/startingpage">Profile</NavLink>
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
            <Button variant="outlined" type="submit" onClick={logout}>
              <NavLink to="/login">Logout</NavLink>
            </Button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
