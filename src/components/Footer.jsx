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
            <Stack direction="row" spacing={2}>
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
        <NavLink style={linkStyles} activeStyle={activeStyles} to="/contact">
          Contact us
        </NavLink>
      </li> */}
            </Stack>
          </ul>
        </AppBar>
      </Box>
    </div>
  );
};

export default Footer;

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

// export default function ButtonAppBar() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             News
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }
