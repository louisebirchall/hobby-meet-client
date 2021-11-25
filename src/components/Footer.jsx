import React from "react";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import { AppBar, Stack } from "@mui/material";

const Footer = () => {
  return (
    <Box>
      <AppBar
        sx={{ top: "auto", bottom: 0 }}
        style={{ backgroundColor: "#3aefd5" }}
      >
        <ul>
          <Stack direction="row" spacing={1} justifyContent="space-evenly">
            <li>
              <NavLink exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/hobbies">
                Hobbies
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/events">
                Events
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/charities">
                Charities
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/products">
                Products
              </NavLink>
            </li>
            {/* <li>
        <NavLink to="/contact">
          Contact us
        </NavLink>
      </li> */}
          </Stack>
        </ul>
      </AppBar>
    </Box>
  );
};

export default Footer;


