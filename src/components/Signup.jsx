import React, { Component } from "react";
import authService from "../services/auth-service";

class Signup extends Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    // * ask Felipe to explain below
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    authService
      .signup(username, password)
      .then((result) => {
        this.setState({ username: "", password: "" });
        this.props.setUser(result.data, true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <br />
          <input
            type="text"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <br />
          <button type="submit">Signup</button>
        </form>
      </div>
    );
  }
}

export default Signup;
