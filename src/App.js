import React from "react";
import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import authService from "./services/auth-service";
// import * as PATHS from "./utils/paths"; // * do we need this, what is it?
import "./App.css";
import Signup from "./components/User/Signup";
import Login from "./components/User/Login";
import Navbar from "./components/Navbar";
import HobbyForm from "./components/Hobby/HobbyForm";
// * try out all the components - how do they all get arranged in here?
import Footer from "./components/Footer";

class App extends Component {
  state = {
    isLoggedIn: null,
    user: null,
  };

  setUser = (user, loggedInStatus) => {
    this.setState({
      user,
      isLoggedIn: loggedInStatus,
    });
  };

  getUser = () => {
    if (this.setState.user === null) {
      authService
        .loggedin()
        .then((response) => {
          this.setState({
            user: response.data.user,
            isLoggedIn: true,
          });
        })
        .catch((error) => {
          this.setState({ isLoggedIn: false });
        });
    }
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { user, isLoggedIn } = this.state;

    return (
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} user={user} setUser={this.setUser} />
        <Switch>
          <Route
            path="/signup"
            render={(props) => <Signup {...props} setUser={this.setUser} />} // <Signup {...props} -- to get the params
          />
          <Route
            path="/login"
            render={(props) => <Login {...props} setUser={this.setUser} />} // <Login {...props} -- to get the params
          />
          {/* just scecking this all works, where do we put it after, though? */}
          <Route
            path="/hobbies/create"
            render={(props) => <HobbyForm {...props} isEdit={false} />}
          />
          <Route
            path="/hobbies/:id/edit"
            render={(props) => <HobbyForm {...props} isEdit={true} />}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
