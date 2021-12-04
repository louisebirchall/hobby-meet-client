import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Component } from "react";
import authService from "../../services/auth-service";
import { Button } from "@material-ui/core";


class Login extends Component {
  state = {
    username: "",
    password: "",
    error: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    authService
      .login(username, password)
      .then((result) => {
        // console.log(result);
        this.setState({ username: '', password: '' });
        this.props.setUser(result.data.user, true);
        this.props.history.push(`/users/${result.data.user._id}`)
      })
      .catch((err) => {
        this.setState({ error: err.response.data.errorMessage });
      });
  };

  render() {
    const { username, password, error } = this.state;

    return (
      <div style={{ paddingBottom: 60 }}>
        <form onSubmit={this.handleSubmit}>
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "35ch" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            <Typography style={{ textAlign: "center" }}>
              Please log in below
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
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <Button 
            onSubmit={this.handleSubmit} 
            type="submit"
            color="primary"
            variant="outlined"
            >
              Login
            </Button>
          </Box>
        </form>
        <div 
       style={{
         display: "flex",
         justifyContent: "center",
         color: "#edb5f7",
         fontWeight: "bold"
        }}
       >
        {error && <p>{error}</p>}
        </div>
      </div>
    );
  }
}

export default Login;
