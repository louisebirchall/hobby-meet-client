import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Stack } from "@mui/material";
import {Container, Button, Card, CardMedia, CardContent, Box, Typography,
 Grid} from "@material-ui/core";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import List from "@mui/material/List";

const linkStyles = {
paddingLeft: 10,
paddingRight: 10
}

const Footer = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

return (
  <AppBar
    sx={{ top: "auto", bottom: 0 }}
    style={{ backgroundColor: "#3aefd5" }}
  >
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
        ></Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              display: { xs: "block", md: "none" },
            }}
          >
            <List>
              <Button href="/">Home</Button>
              <Button href="/profile">My profile</Button>
              <Button href="/hobbies">Hobbies</Button>
              <Button href="/events">Events</Button>
              <Button href="/charities">Charities</Button>
              <Button href="/products">Products</Button>
              <Button href="/contact">Contact us</Button>
            </List>
          </Menu>
        </Box>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
        ></Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Button
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            <List>
              <NavLink exact to="/" style={linkStyles}>
                Home
              </NavLink>
              <NavLink exact to="/hobbies" style={linkStyles}>
                Hobbies
              </NavLink>
              <NavLink exact to="/events" style={linkStyles}>
                Events
              </NavLink>
              <NavLink exact to="/charities" style={linkStyles}>
                Charities
              </NavLink>
              <NavLink exact to="/products" style={linkStyles}>
                Products
              </NavLink>
              <NavLink exact to="/contact" style={linkStyles}>
                Contact us
              </NavLink>
            </List>
          </Button>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
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

// Carolina's
// <Box>
//       <Container style={{ backgroundColor: "#3aefd5" }} maxWidth="lg">
//         <Grid container spacing={5}>
//           <Grid item xs={12} md={6} lg={4} xl={4}>
//             <Box borderBottom={1}>
//               <Typography variant="h6">HobbyMeet</Typography>
//             </Box>
//             <Box>
//               Louise, Florian & Carolina &reg; {new Date().getFullYear()}{" "}
//               IronHack
//             </Box>
//           </Grid>
//           <Grid item>
//             <Box>
//               <NavLink exact to="/">
//                 {" "}
//                 Home{" "}
//               </NavLink>
//             </Box>
//             <Box>
//               <NavLink exact to="/hobbies">
//                 {" "}
//                 Hobbies{" "}
//               </NavLink>
//             </Box>
//             <Box>
//               <NavLink exact to="/events">
//                 {" "}
//                 Events{" "}
//               </NavLink>
//             </Box>
//           </Grid>
//           <Grid item>
//             <Box>
//               <NavLink exact to="/charities">
//                 {" "}
//                 Charities{" "}
//               </NavLink>
//             </Box>
//             <Box>
//               <NavLink exact to="/products">
//                 Products{" "}
//               </NavLink>
//             </Box>
//             <Box>
//             <NavLink exact to="/contact">
//               Contact Us
//             </NavLink>
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>