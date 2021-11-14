import React from "react";
import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import authService from "./services/auth-service";
// import * as PATHS from "./utils/paths"; // * do we need this, what is it?
import "./App.css";
import Signup from "./components/User/Signup";
import Login from "./components/User/Login";
import Navbar from "./components/Navbar";

// * try out all the components - how do they all get arranged in here?
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import HobbiesPage from "./components/Hobby/HobbiesPage";
import HobbyDetails from "./components/Hobby/HobbyDetails";
import HobbyForm from "./components/Hobby/HobbyForm";
import EventsPage from "./components/Event/EventsPage";
import EventDetails from "./components/Event/EventDetails";
import EventForm from "./components/Event/EventForm";
import CharitiesPage from "./components/Charity/CharitiesPage";
import CharityDetails from "./components/Charity/CharityDetails";
import ServerError from "./components/ErrorHandling/ServerError";
import PageNotFound from "./components/ErrorHandling/PageNotFound";

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
          {/* just checking this all works, where do we put it after, though? */}

          {/* Hobbies */}
          <Route
            exact
            path="/hobbies"
            render={(props) => <HobbiesPage {...props} />}
          />
          <Route
            path="/hobbies/:id"
            render={(props) => <HobbyDetails {...props} />}
          />
          <Route
            path="/hobbies/create"
            render={(props) => <HobbyForm {...props} isEdit={false} />}
          />
          <Route
            path="/hobbies/:id/edit"
            render={(props) => <HobbyForm {...props} isEdit={true} />}
          />

          {/* Events */}
          <Route 
            exact
            path="/events" 
            render={(props) => <EventsPage {...props} />} 
          />
          <Route
            path="/events/:id"
            render={(props) => <EventDetails {...props} />}
          />
          <Route
            path="/events/create"
            render={(props) => <EventForm {...props} isEdit={false} />}
          />
          <Route
            path="/events/:id/edit"
            render={(props) => <EventForm {...props} isEdit={true} />}
          />

          {/* Charities */}
          <Route
            exact
            path="/charities"
            render={(props) => <CharitiesPage {...props} />}
          />
          <Route
            path="/charities/:id"
            render={(props) => <CharityDetails {...props} />}
          />

          <Route exact path="/" render={(props) => <Homepage {...props} />} />

          {/* ErrorHandling */}
          <Route path="/500" component={ServerError} />

          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
