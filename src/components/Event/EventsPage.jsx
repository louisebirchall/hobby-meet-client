import React, { Component } from "react";
import { Link } from "react-router-dom";
import eventService from "../../services/event-service";
import {Container, Button, Card, CardActions, CardContent, CardMedia, Typography, Grid} from '@material-ui/core'

class EventsPage extends Component {
  state = {
    listOfEvents: null,
    isLoading: true,
  };

  componentDidMount() {
    // console.log(process.env.REACT_APP_SERVER_API);
    eventService.getEvents()
      .then((response) => {
        this.setState({ listOfEvents: response.data, isLoading: false });
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  }

  render() {
    const { listOfEvents, isLoading } = this.state;

    return (
      <Container>
        <h1>All The Events</h1>
        
        <Grid container>
          {isLoading && <h1>...isLoading</h1>}

          {!isLoading &&
            listOfEvents.map((eachEvent) => {
              return (
                  <Card sx={{ mx: "auto", width: 200 }}>
                    <Grid item key={eachEvent._id}>
                      <Typography variant="h4">{eachEvent.title}</Typography>
                
                      <CardMedia>
                      {eachEvent.image && ( <img src={eachEvent.image} alt={eachEvent.name}/>  )}
                      </CardMedia>
                      <Link to={`/events/${eachEvent._id}`}>{eachEvent.title}</Link>
                    </Grid>
                  </Card>
              );
            })
          }
        </Grid>
      </Container>
    );
  }
}

export default EventsPage;
