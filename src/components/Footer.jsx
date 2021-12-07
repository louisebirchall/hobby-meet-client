import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar } from "@mui/material";
import {
  Box,
  Typography,
  Grid,
} from "@material-ui/core";

const Footer = () => {
  return (
    <AppBar
      style={{ backgroundColor: "#3aefd5" }}
      sx={{ top: "auto", bottom: 0 }}
      maxWidth="xl"
    >
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} lg={4} xl={4}>
          <Box borderBottom={1}>
            <Typography variant="h6">HobbyMeet</Typography>
          </Box>
          <Box>
            Louise, Florian & Carolina &reg; {new Date().getFullYear()} IronHack
          </Box>
        </Grid>

        <Grid item xs={12} md={6} lg={4} xl={4} style={{display: "flex", justifyContent: "space-between"}}>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink exact to="/hobbies">
            Hobbies
          </NavLink>
          <NavLink exact to="/events">
            Events
          </NavLink>
          <NavLink exact to="/charities">
            Charities
          </NavLink>
          <NavLink exact to="/products">
            Products
          </NavLink>
          <NavLink exact to="/contact">
            Contact Us
          </NavLink>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Footer;
