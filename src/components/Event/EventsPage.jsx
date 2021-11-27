import React, { Component } from "react";
import eventService from "../../services/event-service";
import {Container, Button, Card, CardMedia, Typography, Grid, CardContent, CardActions} from '@material-ui/core'
import { useTheme } from '@mui/material/styles';

class EventsPage extends Component {
  state = {
    listOfEvents: null,
    isLoading: true,
  };

  componentDidMount() {
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
      <Container style={{ paddingBottom: 60 }}>
        <Typography variant="h2">All The Events</Typography>
        <Grid container spacing={3}>
          {isLoading && <h1>...isLoading</h1>}

            {!isLoading &&
              listOfEvents.map((eachEvent) => {
                return (
                  <Grid item key={eachEvent._id}>
                    <Card xs={12} md={6} lg={4}>
                      <CardMedia>
                      {eachEvent.image && ( <img src={eachEvent.image} alt={eachEvent.name} width="200px"/>  )}
                      </CardMedia>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">{eachEvent.title}</Typography>
                        <Typography component="div" variant="p">{eachEvent.attendees}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button href={`/events/${eachEvent._id}`}>
                          {eachEvent.title}
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

export default EventsPage;


