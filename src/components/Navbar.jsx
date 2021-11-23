// import React from "react";
import { Link, NavLink } from "react-router-dom";
import authService from "../services/auth-service";
import SearchBar from "./Search/SearchBar";
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

function Navbar({ isLoggedIn, user, setUser }) {
  const styles = {
    centre: {
      display: "flex",
      alignItems: "center",
    },
  };
  const logoutUser = () => {
    authService.logout().then(() => {
      setUser(null, false);
    });
  };

  const SearchBar = styled("div")(({ theme }) => ({
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

  //   return (
  // <div>
  // <NavLink to="/">Home</NavLink>
  //   <ul>
  //     {isLoggedIn && user && (
  //       <>
  //         <li>{user.username}</li>
  //         <li>
  //           <NavLink
  //             to="/"
  //           >
  //             <button onClick={() => logoutUser()}>Logout</button>
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink to={`/profile/${user._id}`}>Profile</NavLink>
  //         </li>
  //       </>
  //     )}
  //     {!isLoggedIn && (
  //       <>
  //         <li>
  //           <NavLink
  //             exact
  //             to="/signup"
  //           >
  //             Signup
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink
  //             to="/login"
  //           >
  //             Login
  //           </NavLink>
  //         </li>
  //       </>
  //     )}
  //   </ul>

  // </div>
  //   );
  // };
  // export default Navbar;

  //export default function SearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon>
              <Link to="/profile">Profile</Link>
            </MenuIcon>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <NavLink to="/">HobbyMeet</NavLink>
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
