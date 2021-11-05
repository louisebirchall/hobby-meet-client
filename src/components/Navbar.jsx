import React from "react";
import { NavLink } from "react-router-dom";
import authService from "../services/auth-service";

const Navbar = ({ isLoggedIn, user, setUser }) => {
  const logoutUser = () => {
    authService.logout().then(() => {
      setUser(null, false);
    });
  };

  const containerStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  };

  const linkStyles = {
    textDecoration: "none",
  };

  const activeStyles = {
    textDecoration: "underline",
  };

  return (
    <div style={containerStyles}>
      <ul>
        {isLoggedIn && (
          <>
            <li>{user.username}</li>
            <li>
              <NavLink style={linkStyles} activeStyle={activeStyles} to="/">
                <button onClick={() => logoutUser()}>Logout</button>
              </NavLink>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <NavLink
                style={linkStyles}
                activeStyle={activeStyles}
                to="/signup"
              >
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink
                style={linkStyles}
                activeStyle={activeStyles}
                to="/login"
              >
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
