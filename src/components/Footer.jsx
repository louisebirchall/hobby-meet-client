import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
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
    <div className="footer">
      <ul style={containerStyles}>
        <li>
          <NavLink style={linkStyles} activeStyle={activeStyles} exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            style={linkStyles}
            activeStyle={activeStyles}
            exact
            to="/hobbies"
          >
            Hobbies
          </NavLink>
        </li>
        <li>
          <NavLink style={linkStyles} activeStyle={activeStyles} to="/events">
            Events
          </NavLink>
        </li>
        <li>
          <NavLink
            style={linkStyles}
            activeStyle={activeStyles}
            exact
            to="/charities"
          >
            Charities
          </NavLink>
        </li>
        {/* <li>
        <NavLink style={linkStyles} activeStyle={activeStyles} to="/contact">
          Contact us
        </NavLink>
      </li> */}
      </ul>
    </div>
  );
};

export default Footer;
