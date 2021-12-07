import React, { Component } from "react";
import hobbyService from "../../services/hobby-service";
import { Link } from "react-router-dom";
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

class HobbiesPage extends Component {
  state = {
    listOfHobbies: null,
    isLoading: true,
  };

  componentDidMount() {
    hobbyService
      .getHobbies()
      .then((response) => {
        this.setState({ listOfHobbies: response.data, isLoading: false });
      })
      .catch((err) => {
        // this.props.history.push("/500");
      });
  }

  render() {
    const { listOfHobbies, isLoading } = this.state;
  /*   const { user } = this.props;
    const { isAdmin } = user; */

    return (
      <Container style={{ paddingBottom: 60 }}>
        <div align="center" style={{ marginBottom: 10 }}>
          <Typography variant="h2">All The Hobbies</Typography>
        </div>
        <Grid
          container
          spacing={3}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {isLoading && <PuffLoader size="100px" color="orchid" />}

          {!isLoading &&
            listOfHobbies.map((eachHobby) => {
              return (
                <Grid item key={eachHobby._id}>
                  <Card xs={12} md={6} lg={4}>
                    <CardMedia align="center">
                      {eachHobby.image && (
                        <img
                          src={eachHobby.image}
                          alt={eachHobby.name}
                          style={{ height: 200 }}
                        />
                      )}
                    </CardMedia>

                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Button
                        variant="outlined"
                        href={`/hobbies/${eachHobby._id}`}
                      >
                        <Typography component="div" variant="h5">
                          {eachHobby.name}
                        </Typography>
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>

{/*         {user && isAdmin && (
          <div align="center">
            <Button
              style={{ marginTop: 20 }}
              color="secondary"
              variant="contained"
              component={Link}
              to="/hobbies/create"
            >
              Add Hobby!
            </Button>
          </div>
        )} */}
      </Container>
    );
  }
}

export default HobbiesPage;
