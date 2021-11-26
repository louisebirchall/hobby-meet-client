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
          <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardMedia component="img"
              sx={{ width: 151 }}
              image={user.image}/>
              
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h3">Username - {user.username}</Typography>
                <Typography variant="p" color="text.secondary" component="div">Email - {user.email}</Typography>
                <p>Full name - {user.fullName}</p>
                <p>Hobbies - {user.hobbies}</p>
                <p>Age - {user.age}</p>
                <p>User type - {user.type}</p>
                <p>Gender - {user.sex}</p>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <Button
                  color="primary"
                  variant="contained"
                  component={NavLink}
                  to={`/profile/${user._id}/edit`}
                >
                  Edit
                </Button>
              </Box>
            </Box>
          </Card>
        )}
      </Container>
    );
  }
}

export default Profile;
