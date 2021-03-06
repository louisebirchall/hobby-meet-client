import React, { Component } from "react";
import { Link } from "react-router-dom";
import charityService from "../../services/charity-service";
import {
  Container,
  Button,
  Card,
  CardMedia,
  Typography,
  Grid,
  CardContent,
} from "@material-ui/core";
import { PuffLoader } from "react-spinners";

class CharitiesPage extends Component {
  state = {
    listOfCharities: null,
    isLoading: true,
  };

  componentDidMount() {
    charityService
      .getCharities()
      .then((response) => {
        this.setState({ listOfCharities: response.data, isLoading: false });
      })
      .catch((err) => {
        // this.props.history.push("/500");
      });
  }

  render() {
    const { listOfCharities, isLoading } = this.state;
    const { user } = this.props;

    return (
      <Container style={{ paddingBottom: 60 }}>
        <div align="center" style={{ marginBottom: 10 }}>
          <Typography variant="h2">All The Charities</Typography>
        </div>
        <Grid
          container
          spacing={3}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {isLoading && <PuffLoader size="100px" color="orchid" />}

          {!isLoading &&
            listOfCharities.map((eachCharity) => {
              return (
                <Grid item key={eachCharity._id}>
                  <Card xs={12} md={6} lg={4}>
                    <CardMedia align="center">
                      {eachCharity.image && (
                        <img
                          src={eachCharity.image}
                          alt={eachCharity.name}
                          style={{ height: 200 }}
                        />
                      )}
                    </CardMedia>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Button
                        variant="outlined"
                        href={`/charities/${eachCharity._id}`}
                      >
                        <Typography component="div" variant="h5">
                          {eachCharity.name}
                        </Typography>
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>

        {user && user.isAdmin && (
          <div align="center">
            <Button
              component={Link}
              color="secondary"
              variant="contained"
              to="/charities/create"
              style={{ marginTop: 20 }}
            >
              Add Charity!
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default CharitiesPage;
