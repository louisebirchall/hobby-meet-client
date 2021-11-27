import { Box } from "@mui/system";
import React, { Component } from "react";
import authService from "../../services/auth-service";
import { Button, TextField, Typography } from "@mui/material";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, email, password } = this.state;

    authService.signup(username, email, password).then((result) => {
      this.setState({ username: "", email: "", password: "" });
      this.props.setUser(result.data, true);
      this.props.history.push(`/users/${result.data._id}`);
    });
    // .catch(() => this.props.history.push("Error while trying to signup"));
  };

  render() {
    const { username, email, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "35ch" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 10,
          }}
          style={{ paddingBottom: 60 }}
        >
          <Typography style={{ textAlign: "center" }}>
            Sign up below to join the fun
          </Typography>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <Button onSubmit={this.handleSubmit} type="submit">
            Signup
          </Button>
        </Box>
      </form>
    );
  }
}

export default Signup;