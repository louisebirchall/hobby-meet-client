import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3aefd5",
    },
    secondary: {
      main: "#edb5f7",
    },
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

export default theme;
