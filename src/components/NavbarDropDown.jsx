import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <Button>
              <Link component={RouterLink} to="/users">
                Profiles
              </Link>
            </Button>
            <Button>
              <Link component={RouterLink} to="/hobbies">
                Hobbies
              </Link>
            </Button>
            <Button>
              <Link component={RouterLink} to="/events">
                Events
              </Link>
            </Button>
            <Button href="/">
              <Link component={RouterLink} to="/charities">
                Charities
              </Link>
            </Button>
            <Button href="/">
              <Link component={RouterLink} to="/products">
                Products
              </Link>
            </Button>
          </ListItemIcon>
          <ListItemText />
        </ListItem>
      </List>
    </Box>
  );
  const anchor = "top";
  return (
    <div>
      <React.Fragment key={anchor}>
        <Box sx={{ textAlign: "center" }}>
          <Button onClick={toggleDrawer(anchor, true)}>Menu</Button>
        </Box>
        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {list(anchor)}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
