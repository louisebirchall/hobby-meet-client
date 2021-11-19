import React, { Component } from "react";
// import { render } from "react-dom";
import { NavLink } from "react-router-dom";
import authService from "../services/auth-service";
import SearchBar from "./Search/SearchBar";

// needs to be converted into a class component to implement SearchBar here

class Navbar extends Component {
  state = {
    showSearchBar: false,
  };

  handleToggle = () => {
    this.setState({ showSearchBar: !this.state.showSearchBar });
  };

  render() {
    const { isLoggedIn, user, setUser } = this.props;

    const logoutUser = () => {
      authService.logout().then(() => {
        setUser(null, false);
      });
    };

    const containerStyles = {
      display: "flex",
      justifyContent: "space-evenly",
    };

    const linkStyles = {
      textDecoration: "none",
    };

    const activeStyles = {
      textDecoration: "underline",
    };

    return (
      <div>
        <NavLink to="/">Home</NavLink>
        <ul style={containerStyles}>
          {isLoggedIn && user && (
            <>
              <li>{user.username}</li>
              <li>
                <NavLink
                  /*             style={linkStyles}
                activeStyle={activeStyles}*/
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
          <li>
            <button onClick={this.handleToggle}>
              {this.state.showSearchBar ? "Hide Search" : "Search"}
            </button>

            {this.state.showSearchBar && <SearchBar />}
          </li>
          {!isLoggedIn && (
            <>
              <li>
                <NavLink
                  style={linkStyles}
                  activeStyle={activeStyles}
                  exact
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
  }
}

export default Navbar;
