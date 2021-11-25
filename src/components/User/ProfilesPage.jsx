import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from '../../services/user-service'
import {Container, Button, Card, CardMedia, Typography, Grid} from '@material-ui/core'


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
          {isLoading && <h1>...isLoading</h1>}

          {!isLoading &&
            listOfProfiles.map((eachProfile) => {
              return (
                <Grid item key={eachProfile._id}>
                  <Card xs={12} md={6} lg={4}>
                    <Typography variant="h4">{eachProfile.title}</Typography>

                    <CardMedia>
                      {eachProfile.image && (
                        <img src={eachProfile.image} alt={eachProfile.name} />
                      )}
                    </CardMedia>

                    <Button>
                      <Link to={`/profiles/${eachProfile._id}`}>
                        {eachProfile.name}
                      </Link>
                    </Button>
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
