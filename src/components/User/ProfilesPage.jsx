import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../services/user-service";
import {
  Container,
  Button,
  Card,
  CardMedia,
  Typography,
  Grid,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { PuffLoader } from "react-spinners";

class ProfilesPage extends Component {
  state = {
    listOfProfiles: null,
    isLoading: true,
  };

  componentDidMount() {
    userService
      .getUsers()
      .then((response) => {
        this.setState({ listOfProfiles: response.data, isLoading: false });
      })
      .catch((err) => {
        // this.props.history.push("/500");
      });
  }

  render() {
    const { listOfProfiles, isLoading } = this.state;

    return (
      <Container style={{ paddingBottom: 60 }}>
        <Typography variant="h2">All The Profiles</Typography>
        <Grid container spacing={3}>
          {isLoading && <PuffLoader size="100px" color="orchid" />}

          {!isLoading &&
            listOfProfiles.map((eachProfile) => {
              return (
                <Grid item key={eachProfile._id}>
                  <Card xs={12} md={6} lg={4}>
                    <CardMedia>
                      {eachProfile.image && (
                        <img src={eachProfile.image} alt={eachProfile.name} width="200px"/>
                      )}
                    </CardMedia>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h4">
                        {eachProfile.title}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button>
                        <Link to={`/users/${eachProfile._id}`}>
                          {eachProfile.username}
                        </Link>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    );
  }
}

export default ProfilesPage;
