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
        <div align="center" style={{ marginBottom: 10 }}>
          <Typography variant="h1">Welcome</Typography>
        </div>
        <Card sx={{ display: "flex" }}>
          {isLoading && <PuffLoader size="100px" color="orchid" />}

          {!isLoading && (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                
                <CardMedia
                align="center"
                  component="img"
                  image={user.image}
                  alt={user.username}
                  style={{ borderRadius: 50, width: 250 }}
                />

                <Typography component="div" variant="h3">
                  {user.username}
                </Typography>
                <Typography variant="p" color="text.secondary" component="div">
                  {user.email}
                </Typography>
                <Typography variant="p" color="text.secondary" component="div">
                  Name - {user.fullName}
                </Typography>
                {/* <Typography variant="p" color="text.secondary" component="div">Hobbies - {user.hobbies}</Typography> */}
                <Typography variant="p" color="text.secondary" component="div">
                  Attending - {user.events}
                </Typography>
                <Typography variant="p" color="text.secondary" component="div">
                  Age - {user.age}
                </Typography>
                <Typography variant="p" color="text.secondary" component="div">
                  User type - {user.type}
                </Typography>
                <Typography variant="p" color="text.secondary" component="div">
                  Gender - {user.sex}
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  component={NavLink}
                  to={`/users/${user._id}/edit`}
                >
                  Edit
                </Button>
              </CardContent>
            </Box>
          )}
        </Card>
      </Container>
    );
  }
}

export default Profile;
