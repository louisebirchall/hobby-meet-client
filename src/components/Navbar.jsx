// import React from "react";
import { NavLink, Link as RouterLink } from "react-router-dom";
import authService from "../services/auth-service";
import SearchBar from "./Search/SearchBar";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@material-ui/core";
import { Stack } from "@mui/material";
import NavbarDropDown from "../components/NavbarDropDown";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme";
import List from "@mui/material/List";
import Menu from "@mui/material/Menu";

function Navbar({ isLoggedIn, user, setUser }) {
  const logoutUser = () => {
    authService.logout().then(() => {
      setUser(null, false);
    });
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar
          position="static"
          style={{
            backgroundColor: "#3aefd5",
            Typography: "Montserrat",
            marginBottom: "20px",
          }}
        >
          {/* <NavbarDropDown /> */}
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            ></Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "block" },
                }}
              >
                <List>
                  <Button component={RouterLink} to="/">Home</Button>
                  <Button component={RouterLink} to="/users">All users</Button>
                  <Button component={RouterLink} to="/hobbies">Hobbies</Button>
                  <Button component={RouterLink} to="/events">Events</Button>
                  <Button component={RouterLink} to="/charities">Charities</Button>
                  <Button component={RouterLink} to="/products">Products</Button>
                  <Button component={RouterLink} to="/contact">Contact us</Button>
                </List>
              </Menu>
            </Box>

            

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <Button href="/">HobbyMeet</Button>
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <SearchBar />

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <ul>
                <Stack direction="row" spacing={2}>
                  {isLoggedIn && user && (
                    <>
                      <li>
                        <NavLink to={`/users/${user._id}`}>
                          <Button variant="contained" color="secondary">
                            Profile
                          </Button>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => logoutUser()}
                          >
                            Logout
                          </Button>
                        </NavLink>
                      </li>
                    </>
                  )}
                  {!isLoggedIn && (
                    <>
                      <li>
                        <NavLink exact to="/signup">
                          <Button variant="contained" color="primary">
                            Signup
                          </Button>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/login">
                          <Button variant="contained" color="primary">
                            Login
                          </Button>
                        </NavLink>
                      </li>
                    </>
                  )}
                </Stack>
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
export default Navbar;
