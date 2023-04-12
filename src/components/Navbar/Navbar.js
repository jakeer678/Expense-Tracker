
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

  const logout = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     logout();
  //   }, 50000);
  // },[logout]);

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
