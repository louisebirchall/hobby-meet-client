import React from "react";
import { NavLink } from "react-router-dom";
import authService from "../services/auth-service";


const Navbar = ({ isLoggedIn, user, setUser }) => {
  const logoutUser = () => {
    authService.logout().then(() => {
      setUser(null, false);
    });
  };

  return (
    <div>
    <NavLink to="/">Home</NavLink>
      <ul>
        {isLoggedIn && user && (
          <>
            <li>{user.username}</li>
            <li>
              <NavLink
                to="/"
              >
                <button onClick={() => logoutUser()}>Logout</button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <NavLink
                exact
                to="/signup"
              >
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink
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