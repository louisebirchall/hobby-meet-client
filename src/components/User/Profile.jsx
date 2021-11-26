import React, { Component } from "react";
import userService from "../../services/user-service";
import { NavLink } from "react-router-dom";
import { Container, Button, Card, CardMedia, CardContent, Box, Typography } from "@material-ui/core";


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
          <Card sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardMedia
                component="img"
                sx={{ width: 111 }}
                image={user.image}
                width="150"
              />

              <CardContent sx={{ width: 150}}>
                <Typography component="div" variant="h3">
                  {user.username}
                </Typography>
                <Typography variant="p" color="text.secondary" component="div">
                  Email - {user.email}
                </Typography>
                <Typography variant="p" color="text.secondary" component="div">Full name - {user.fullName}</Typography>
                <Typography variant="p" color="text.secondary" component="div">Hobbies - {user.hobbies}</Typography>
                <Typography variant="p" color="text.secondary" component="div">Attending - {user.events}</Typography>
                <Typography variant="p" color="text.secondary" component="div">Age - {user.age}</Typography>
                <Typography variant="p" color="text.secondary" component="div">User type - {user.type}</Typography>
                <Typography variant="p" color="text.secondary" component="div">Gender - {user.sex}</Typography>
                <Button
                  color="primary"
                  variant="contained"
                  component={NavLink}
                  to={`/profile/${user._id}/edit`}
                >
                  Edit
                </Button>
              </CardContent>

            </Box>
          </Card>
        )}
      </Container>
    );
  }
}

export default Profile;
