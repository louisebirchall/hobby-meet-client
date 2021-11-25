// import React from "react";
import { NavLink } from "react-router-dom";
import authService from "../services/auth-service";
import Search from "./Search/SearchBar"; // ! link search
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@material-ui/core";
import { Stack } from "@mui/material";
import NavbarDropDown from '../components/NavbarDropDown'
import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme";
import NavDrawer from "./NavDrawer"
import SearchBar from "@material-ui/core";

function Navbar({ isLoggedIn, user, setUser }) {
  const logoutUser = () => {
    authService.logout().then(() => {
      setUser(null, false);
    });
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton>
            {/* <Typography variant="h6">Menu</Typography> */}
            <NavbarDropDown />
          </IconButton>
  
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <Button href="/">HobbyMeet</Button>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <SearchBar>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </SearchBar>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <ul>
              <Stack direction="row" spacing={2}>
                {isLoggedIn && user && (
                  <>
                    <li>
                      <NavLink to={`/profile/${user._id}`}>
                        <Button>Profile</Button>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/">
                        <Button onClick={() => logoutUser()}>Logout</Button>
                      </NavLink>
                    </li>
                  </>
                )}
                {!isLoggedIn && (
                  <>
                    <li>
                      <NavLink exact to="/signup">
                        <Button>Signup</Button>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/login">
                        <Button>Login</Button>
                      </NavLink>
                    </li>
                  </>
                )}
              </Stack>
            </ul>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar;
