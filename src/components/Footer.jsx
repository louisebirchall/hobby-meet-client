import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Stack } from "@mui/material";
import {
  Container,
  Button,
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Grid,
} from "@material-ui/core";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";

const Footer = () => {
  return (
    <AppBar
      style={{ backgroundColor: "#3aefd5" }}
      sx={{ top: "auto", bottom: 0 }}
    >
      <Container style={{ backgroundColor: "#3aefd5" }} maxWidth="xl">
        <Grid container spacing={5}>
          <Grid item xs={12} md={6} lg={4} xl={4}>
            <Box borderBottom={1}>
              <Typography variant="h6">HobbyMeet</Typography>
            </Box>
            <Box>
              Louise, Florian & Carolina &reg; {new Date().getFullYear()}{" "}
              IronHack
            </Box>
          </Grid>
          <Grid item sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            <Box>
              <NavLink exact to="/">
                {" "}
                Home{" "}
              </NavLink>
            </Box>
            <Box>
              <NavLink exact to="/hobbies">
                {" "}
                Hobbies{" "}
              </NavLink>
            </Box>
            <Box>
              <NavLink exact to="/events">
                {" "}
                Events{" "}
              </NavLink>
            </Box>
          </Grid>
          <Grid item>
            <Box>
              <NavLink exact to="/charities">
                {" "}
                Charities{" "}
              </NavLink>
            </Box>
            <Box>
              <NavLink exact to="/products">
                Products{" "}
              </NavLink>
            </Box>
            <Box>
              <NavLink exact to="/contact">
                Contact Us
              </NavLink>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Footer;

