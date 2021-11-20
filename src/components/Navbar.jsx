import React, { Component } from "react";
// import { render } from "react-dom";
import { NavLink } from "react-router-dom";
import authService from "../services/auth-service";
import SearchBar from "./Search/SearchBar";

// needs to be converted into a class component to implement SearchBar here


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
              <NavLink to={`/profile/${user._id}`}>Profile</NavLink>
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
              <NavLink to="/login">
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
