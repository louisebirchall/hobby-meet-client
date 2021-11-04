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
      <ul>
        {isLoggedIn && (
          <>
            <li>{user.username}</li>
            <li>
              <NavLink to="/">
                <button onClick={() => logoutUser()}>Logout</button>
              </NavLink>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
