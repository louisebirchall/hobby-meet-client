// import React from "react";
import { NavLink } from "react-router-dom";
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
import NavbarDropDown from '../components/NavbarDropDown'
import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme";

function Navbar({ isLoggedIn, user, setUser }) {
  const logoutUser = () => {
    authService.logout().then(() => {
      setUser(null, false);
    });
  };

  // const Search = styled("div")(({ theme }) => ({
  //   position: "relative",
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   "&:hover": {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  //   marginLeft: 0,
  //   width: "100%",
  //   [theme.breakpoints.up("sm")]: {
  //     marginLeft: theme.spacing(1),
  //     width: "auto",
  //   },
  // }));

  // const SearchIconWrapper = styled("div")(({ theme }) => ({
  //   padding: theme.spacing(0, 2),
  //   height: "100%",
  //   position: "absolute",
  //   pointerEvents: "none",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // }));

  // const StyledInputBase = styled(InputBase)(({ theme }) => ({
  //   color: "inherit",
  //   "& .MuiInputBase-input": {
  //     padding: theme.spacing(1, 1, 1, 0),
  //     // vertical padding + font size from searchIcon
  //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //     transition: theme.transitions.create("width"),
  //     width: "100%",
  //     [theme.breakpoints.up("sm")]: {
  //       width: "12ch",
  //       "&:focus": {
  //         width: "20ch",
  //       },
  //     },
  //   },
  // }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar
          position="static"
          style={{ backgroundColor: "#3aefd5", Typography: "Montserrat" }}
        >
          <Toolbar>
            <IconButton>
              {/* <Typography variant="h6">Menu</Typography> */}
              <NavbarDropDown />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <Button href="/">HobbyMeet</Button>
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            {/* <Search> */}
              <SearchBar /> {/* ! how to include searchbar? */}
              {/* <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search> */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <ul>
                <Stack direction="row" spacing={2}>
                  {isLoggedIn && user && (
                    <>
                      <li>
                        <NavLink to={`/profile/${user._id}`}>
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
