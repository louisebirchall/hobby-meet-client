import React, { Component } from "react";
import { Link } from "react-router-dom";
import charityService from "../../services/charity-service";
import {Container, Button, Card, CardMedia, Typography, Grid, CardContent, CardActions} from '@material-ui/core'


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
      <Container style={{ paddingBottom: 60 }}>
        <Typography variant="h2">All The Charities</Typography>
        <Grid container spacing={3}>
          {isLoading && <h1>...isLoading</h1>}

          {!isLoading &&
          listOfCharities.map((eachCharity) => {
            return (
              <Grid item key={eachCharity._id}>
                <Card xs={12} md={6} lg={4}>
                  <CardMedia>
                  {eachCharity.image && ( 
                    <div align="center"> <img src={eachCharity.image} alt={eachCharity.name} maxWidth="300px" height="150px"/> </div> )}
                  </CardMedia>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    {/* <Typography component="div" variant="h5">{eachCharity.name}</Typography> */}
                  </CardContent>
                  <CardActions>
                    <Button href={`/charities/${eachCharity._id}`}><Typography component="div" variant="h5">{eachCharity.name}</Typography></Button> 
                    
                  </CardActions>
                </Card>
              </Grid>
              );
            })}
        </Grid>
        <div><Button style={{marginTop: 20}} color="secondary" variant="contained" component={Link} to="/charities/create">
                  Create!
                </Button></div>
      </Container>
    );
  }
}

export default CharitiesPage;
