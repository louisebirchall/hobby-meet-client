import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {

  return (
    <div className="footer">
      <ul >
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/hobbies"
          >
            Hobbies
          </NavLink>
        </li>
        <li>
          <NavLink to="/events">
            Events
          </NavLink>
        </li>
        <li>
          <NavLink
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
