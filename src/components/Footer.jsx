import React from "react";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import { AppBar, Stack } from "@mui/material";

const Footer = () => {
  return (
    <div>
      <Box>
        <AppBar color="primary" sx={{ top: "auto", bottom: 0 }}>
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
            </Stack>
          </ul>
        </AppBar>
      </Box>
    </div>
  );
};

export default Footer;


