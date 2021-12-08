import React, { Component } from "react";
import userService from "../../services/user-service";
import { NavLink } from "react-router-dom";
import {
  Container,
  Button,
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
} from "@material-ui/core";
import { PuffLoader } from "react-spinners";

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
        {isLoading && <PuffLoader size="100px" color="orchid" />}

        <Card sx={{ display: "flex" }}>
          {!isLoading && (
            <>
              <Box
                align="center"
                style={{ marginBottom: 10 }}
                sx={{ flex: "1 0 auto" }}
              >
                <Typography variant="h2">Welcome {user.username}</Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <CardMedia
                    component="img"
                    image={user.image}
                    alt={user.username}
                    style={{
                      borderRadius: "50%",
                      borderStyle: "solid",
                      borderWidth: "thin",
                      borderColor: "#3AEFD5",
                      width: 250,
                    }}
                  />

                  <Typography
                    variant="p"
                    color="text.secondary"
                    component="div"
                  >
                    Full name - {user.fullName}
                  </Typography>
                  <Typography
                    variant="p"
                    color="text.secondary"
                    component="div"
                  >
                    Email -{user.email}
                  </Typography>
                  <Typography
                    variant="p"
                    color="text.secondary"
                    component="div"
                  >
                    Age - {user.age}
                  </Typography>
                  <Typography
                    variant="p"
                    color="text.secondary"
                    component="div"
                  >
                    User type - {user.type}
                  </Typography>
                  <Typography
                    variant="p"
                    color="text.secondary"
                    component="div"
                  >
                    Are you an admin?- {user.isAdmin}
                  </Typography>
                  <Typography
                    variant="p"
                    color="text.secondary"
                    component="div"
                  >
                    Gender - {user.sex}
                  </Typography>
                  <Typography
                    variant="p"
                    color="text.secondary"
                    component="div"
                  >
                    Hobbies - {user.hobbies}
                  </Typography>
                  <Typography
                    variant="p"
                    color="text.secondary"
                    component="div"
                  >
                    Attending events- {user.events}
                  </Typography>

                  <Box align="center" style={{ marginTop: 30 }}>
                    <Button
                      color="primary"
                      variant="contained"
                      component={NavLink}
                      to={`/users/${user._id}/edit`}
                    >
                      Edit Profile
                    </Button>
                  </Box>
                </CardContent>
              </Box>
            </>
          )}
        </Card>
      </Container>
    );
  }
}

export default Profile;
