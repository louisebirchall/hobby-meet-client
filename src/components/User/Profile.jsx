import React, { Component } from "react";
import userService from "../../services/user-service";
import { NavLink } from "react-router-dom";
import { Container, Button } from "@material-ui/core";

const styles = {
  divStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: "center",
  },
};

class Profile extends Component {
  state = {
    user: null,
    isLoading: true,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    // console.log(this.props.profileData)
    userService
      .getUser(id)
      .then((result) => {
        this.setState({ user: result.data, isLoading: false });
      })
      .catch((err) => {
        //console.log(err.response.status)
        if (err.response.status === 403) {
          this.props.history.push("/login");
        }
      });
  }

  render() {
    const { user, isLoading } = this.state;

    return (
      <Container style={{ paddingBottom: 60 }}>
        {isLoading && <h1>...isLoading</h1>}
        {!isLoading && (
          <div style={styles.divStyle}>
            <img src={user.image} alt="user" width="250" />
            <h3>Username - {user.username}</h3>
            <p>Email - {user.email}</p>
            <p>Full name - {user.fullName}</p>
            <p>Hobbies - {user.hobbies}</p>
            <p>Age - {user.age}</p>
            <p>For - {user.type}</p> // * what's best here?
            <p>Gender - {user.sex}</p>
            <Button
              color="primary"
              variant="contained"
              component={NavLink}
              to={`/profile/${user._id}/edit`}
            >
              Edit
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default Profile;
