import React, { Component } from "react";
import authService from "../../services/auth-service";

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
        this.props.setUser(result.data, true);
      })
      .catch((err) => {
        this.setState({ error: err.response.data.errorMessage });
      });
  };

  render() {
    const { username, password, error } = this.state;

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
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
  }
}

export default Login;
