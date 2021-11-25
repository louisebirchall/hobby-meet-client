import { createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    // type: "light",
    primary: {
      main: "#3aefd5",
    },
    secondary: {
      main: "#edb5f7",
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    textTransform: "none",
    textDecoration: "none",
    color: "black",
  },

  button: {
    textTransform: "none",
  },
});

export default theme;
