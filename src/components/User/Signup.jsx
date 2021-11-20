import React, { Component } from "react";
import authService from "../../services/auth-service";

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

    authService
      .signup(username, email, password)
      .then((result) => {
        this.setState({ username: "", email: "", password: "" });
        this.props.setUser(result.data, true);
        this.props.history.push(`/profile/${result.data._id}`)
      })
     // .catch(() => this.props.history.push("Error while trying to signup"));
  };

  render() {
    const { username, email, password } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <button type="submit">Signup</button>
        </form>
      </div>
    );
  }
}

export default Signup;
