import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import "typeface-montserrat"
import theme from "./theme"
import { ThemeProvider } from "@material-ui/core";

// ! ThemeProvider before or after BrowserRouter

ReactDOM.render(
  <React.StrictMode>
  <ThemeProvider theme={theme} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
