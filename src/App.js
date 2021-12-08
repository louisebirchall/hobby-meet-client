import React from "react";
import { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import authService from "./services/auth-service";
import "./App.css";
import Navbar from "./components/Navbar";
import Frontpage from "./components/Frontpage";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import Signup from "./components/User/Signup";
import Login from "./components/User/Login";
import Profile from "./components/User/Profile";
import ProfileForm from "./components/User/ProfileForm";
import ProfilesPage from "./components/User/ProfilesPage";
import HobbiesPage from "./components/Hobby/HobbiesPage";
import HobbyDetails from "./components/Hobby/HobbyDetails";
import HobbyForm from "./components/Hobby/HobbyForm";
import EventsPage from "./components/Event/EventsPage";
import EventDetails from "./components/Event/EventDetails";
import EventForm from "./components/Event/EventForm";
import CharitiesPage from "./components/Charity/CharitiesPage";
import CharityDetails from "./components/Charity/CharityDetails";
import CharityForm from "./components/Charity/CharityForm";
import ProductsPage from "./components/Product/ProductsPage";
import ProductDetails from "./components/Product/ProductDetails";
import ProductForm from "./components/Product/ProductForm";
import ServerError from "./components/ErrorHandling/ServerError";
import PageNotFound from "./components/ErrorHandling/PageNotFound";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import theme from "./theme";
import Payment from "./components/Payment/Payment";
import SearchResults from "./components/Search/SearchResults";
import Contact from "./components/Contact";

const montserrat = createTheme({
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
});

class App extends Component {
  state = {
    isLoggedIn: null,
    user: null,
    itemToBuy: null,
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


  payForItem = (itemToBuy) => {
    this.setState( {itemToBuy}, () => {
      // this makes sure it only runs after the state is updated
      this.props.history.push("/payments/create-payment-intent")
    } )
  }

  render() {
    const { user, isLoggedIn, itemToBuy } = this.state;

    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Navbar isLoggedIn={isLoggedIn} user={user} setUser={this.setUser} />

          <Switch>
            <Route exact path="/" render={(props) => <Homepage {...props} />} />

            {/* Search */}
            <Route
              exact
              path="/search"
              render={(props) => <SearchResults {...props} />}
            />

            {/* User */}
            <Route
              path="/signup"
              render={(props) => <Signup {...props} setUser={this.setUser} />} // <Signup {...props} -- to get the params
            />
            <Route
              path="/login"
              render={(props) => <Login {...props} setUser={this.setUser} />} // <Login {...props} -- to get the params
            />
            <Route
              exact
              path="/users"
              render={(props) => <ProfilesPage {...props} />}
            />
            <Route
              exact
              path="/users/:id"
              render={(props) => <Profile {...props} setUser={this.setUser} />}
            />
            <Route
              path="/users/:id/create"
              render={(props) => <Profile {...props} isEdit={false} />}
            />
            <Route
              path="/users/:id/edit"
              render={(props) => <ProfileForm {...props} isEdit={true} />}
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
              render={(props) => <HobbiesPage {...props} user={user}/>}
            />
            <Route
              path="/hobbies/create"
              render={(props) =>  <HobbyForm {...props} isEdit={false} />}
            />
            <Route
              exact
              path="/hobbies/:id"
              render={(props) => <HobbyDetails {...props} user={user} />}
            />
            <Route
              path="/hobbies/:id/edit"
              render={(props) => <HobbyForm {...props} isEdit={true} />}
            />

            {/* Events */}
            <Route
              exact
              path="/events"
              render={(props) => <EventsPage {...props} user={user}/>}
            />
            <Route
              path="/events/create"
              render={(props) => <EventForm {...props} isEdit={false} user={user}/>}
            />
            <Route
              exact
              path="/events/:id"
              render={(props) => <EventDetails {...props} user={user} />}
            />
            <Route
              path="/events/:id/edit"
              render={(props) => <EventForm {...props} isEdit={true} />}
            />

            {/* Charities */}
            <Route
              exact
              path="/charities"
              render={(props) => <CharitiesPage {...props} user={user}/>}
            />
            <Route
              path="/charities/create"
              render={(props) => <CharityForm {...props} isEdit={false} />}
            />
            <Route
              exact
              path="/charities/:id"
              render={(props) => <CharityDetails {...props} user={user}/>}
            />
            <Route
              path="/charities/:id/edit"
              render={(props) => <CharityForm {...props} isEdit={true} />}
            />

            {/* Products */}
            <Route
              exact
              path="/products"
              render={(props) => <ProductsPage {...props} payForItem={this.payForItem} user={user}/>}
            />
            <Route
              path="/products/create"
              render={(props) => <ProductForm {...props} isEdit={false} user={user}/>}
            />
            <Route
              exact
              path="/products/:id"
              render={(props) => <ProductDetails {...props} user={user}/>}
            />
            <Route
              path="/products/:id/edit"
              render={(props) => <ProductForm {...props} isEdit={true} />}
            />

            {/* Contact */}
            <Route
              exact
              path="/contact"
              render={(props) => <Contact {...props} />}
            />

            {/* Payment */}
            <Route
              exact
              path="/payments/create-payment-intent"
              render={(props) => <Payment {...props} itemToBuy={itemToBuy}/>}
            />


            {/* ErrorHandling */}
            <Route path="/500" component={ServerError} />
            <Route component={PageNotFound} />
          </Switch>

          <Footer />
        </ThemeProvider>
      </div>
    );
  }
}

export default withRouter(App);
