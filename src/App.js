import React from "react";
import { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import authService from "./services/auth-service";
import "./App.css";
import Navbar from "./components/Navbar";
import Frontpage from "./components/Frontpage";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import Signup from "./components/User/Signup";
import Login from "./components/User/Login";
import Profile from "./components/User/Profile";
import ProfileFom from "./components/User/ProfileForm";
import HobbiesPage from "./components/Hobby/HobbiesPage";
import HobbyDetails from "./components/Hobby/HobbyDetails";
import HobbyForm from "./components/Hobby/HobbyForm";
import EventsPage from "./components/Event/EventsPage";
import EventDetails from "./components/Event/EventDetails";
import EventForm from "./components/Event/EventForm";
import CharitiesPage from "./components/Charity/CharitiesPage";
import CharityDetails from "./components/Charity/CharityDetails";
// import CharityForm from "./components/Charity/CharityForm";
import ServerError from "./components/ErrorHandling/ServerError";
import PageNotFound from "./components/ErrorHandling/PageNotFound";
// import Typography from "@material-ui/core/Typography";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

  const montserrat = createTheme({
    typography: {
      fontFamily: ["Montserrat"].join(","),
    },
  });

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
    if (!this.setState.user) {
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
      <ThemeProvider theme={montserrat}>
        <div className="App">
          <Navbar isLoggedIn={isLoggedIn} user={user} setUser={this.setUser} />
          <Switch>
            <Route exact path="/" render={(props) => <Homepage {...props} />} />
            {/* User */}
            <Route
              path="/signup"
              render={(props) => <Signup {...props} setUser={this.setUser} />} // <Signup {...props} -- to get the params
            />
            {/* <Redirect from="/signup" to="/login" /> */}
            <Route
              path="/login"
              render={(props) => <Login {...props} setUser={this.setUser} />} // <Login {...props} -- to get the params
            />
            <Route
              exact
              path="/profile/:id"
              render={(props) => <Profile {...props} setUser={this.setUser} />}
            />
              <Route
              path="/profile/:id/create"
              render={(props) => <ProfileFom {...props} isEdit={false} />}
            />
            <Route
              path="/profile/:id/edit"
              render={(props) => <ProfileFom {...props} isEdit={true} />}
            />


            {/* Frontpage */}
            <Route
              exact
              path="/"
              render={(props) => <Frontpage {...props} />}
            />


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
            {/* <Route
            path="/charities/create"
            render={(props) => <CharityForm {...props} isEdit={false} />}
          />
          <Route
            path="/charities/:id/edit"
            render={(props) => <CharityForm {...props} isEdit={true} />}
          /> */}
            {/* ErrorHandling */}
            <Route path="/500" component={ServerError} />
            <Route component={PageNotFound} />
          </Switch>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
