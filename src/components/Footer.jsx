import React from "react";
import { NavLink } from "react-router-dom";
// import { Box } from "@mui/system";
import { AppBar, Stack } from "@mui/material";
import {Container, Button, Card, CardMedia, CardContent, Box, Typography,
 Grid} from "@material-ui/core";

const Footer = () => {
  return (
      <Box>
        <Container style={{ backgroundColor: "#3aefd5" }}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} lg={4}>
              <Box borderBottom={1}><Typography variant="h6">HobbyMeet</Typography></Box>
              <Box>Louise, Florian & Carolina @2021 IronhHack</Box>
            </Grid>
            <Grid item >
              <Box>
                <NavLink exact to="/"> Home </NavLink>
              </Box>
              <Box>
                <NavLink exact to="/hobbies"> Hobbies </NavLink>
              </Box>
              <Box>
                <NavLink exact to="/events"> Events </NavLink>
              </Box>
            </Grid>
            <Grid item >
              <Box>
                <NavLink exact to="/charities"> Charities </NavLink>
              </Box>
              <Box>
                <NavLink exact to="/products">Products </NavLink>
              </Box>
            </Grid>
          </Grid> 
        </Container>
      </Box>
  );
};

export default Footer;


{/* <Box>
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
    </Stack>
  </ul>
</AppBar>
</Box> */}

      {/* <li>
  <NavLink to="/contact">
    Contact us
  </NavLink>
</li> */}