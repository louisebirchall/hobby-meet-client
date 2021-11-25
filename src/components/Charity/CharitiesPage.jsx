import React, { Component } from "react";
import { Link } from "react-router-dom";
import charityService from "../../services/charity-service";
import {Container, Button, Card, CardMedia, Typography, Grid} from '@material-ui/core'


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

    return (
      <Container fixed style={{ paddingBottom: 60 }}>
        <Typography variant="h2">All The Charities</Typography>
        <Grid container spacing={3}>
          {isLoading && <h1>...isLoading</h1>}

          {!isLoading &&
          listOfCharities.map((eachCharity) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={eachCharity._id}>
                <Card>
                  <Typography variant="h4">{eachCharity.title}</Typography>
                  <CardMedia>
                  {eachCharity.image && ( <img src={eachCharity.image} alt={eachCharity.name} width="150px"/>  )}
                  </CardMedia>

                  <Button>
                    <Link to={`/charities/${eachCharity._id}`}>
                      {eachCharity.name}</Link>
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

export default CharitiesPage;
