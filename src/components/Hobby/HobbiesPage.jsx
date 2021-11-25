import React, { Component } from "react";
import { Link } from "react-router-dom";
import hobbyService from "../../services/hobby-service";
import {Container, Button, Card, CardMedia, Typography, Grid, CardContent, CardActions} from '@material-ui/core'

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

    return (
      <Container>
        <Typography variant="h2">All The Hobbies</Typography>
        <Grid container spacing={3}>
          {isLoading && <h1>...isLoading</h1>}

          {!isLoading &&
            listOfHobbies.map((eachHobby) => {
              return (
                <Grid item  key={eachHobby._id}>
                  <Card xs={12} md={6} lg={4}>
                    <CardMedia>
                    {eachHobby.image && ( <img src={eachHobby.image} alt={eachHobby.name}/>  )}
                    </CardMedia>
                    
                    <CardContent>
                      <Typography variant="h4">{eachHobby.title}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button href={`/hobbies/${eachHobby._id}`}>
                        {eachHobby.name}
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

export default HobbiesPage;
