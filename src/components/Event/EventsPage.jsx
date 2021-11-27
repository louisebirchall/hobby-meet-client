import React, { Component } from "react";
import eventService from "../../services/event-service";
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
import { useTheme } from "@mui/material/styles";
import { PuffLoader } from "react-spinners";

class EventsPage extends Component {
  state = {
    listOfEvents: null,
    isLoading: true,
  };

  componentDidMount() {
    eventService
      .getEvents()
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
        <div align="center" style={{ marginBottom: 10 }}>
          <Typography variant="h2">All The Events</Typography>
        </div>
        <Grid
          container
          spacing={3}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {isLoading && <PuffLoader size="100px" color="orchid" />}

          {!isLoading &&
            listOfEvents.map((eachEvent) => {
              return (
                <Grid item key={eachEvent._id}>
                  <Card xs={12} md={6} lg={4}>
                    <CardMedia align="center">
                      {eachEvent.image && (
                        <img
                          src={eachEvent.image}
                          alt={eachEvent.name}
                          height="150px"
                        />
                      )}
                    </CardMedia>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      {/* <Typography component="div" variant="h5">{eachEvent.title}</Typography>
                        <Typography component="div" variant="p">{eachEvent.attendees}</Typography> */}
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="outlined"
                        href={`/events/${eachEvent._id}`}
                      >
                        <Typography component="div" variant="h5">
                          {eachEvent.title}
                        </Typography>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
        <div align="center">
          <Button
            style={{ marginTop: 20 }}
            color="secondary"
            variant="contained"
            component={Link}
            to="/events/create"
          >
            Add Event!
          </Button>
        </div>
      </Container>
    );
  }
}

export default EventsPage;

/* return (
  <Container>
    <Typography variant="h2">All The Events</Typography>
    <Grid container spacing={3}>
    
      {isLoading && <h1>...isLoading</h1>}

      {!isLoading &&
        listOfEvents.map((eachEvent) => {
          return (
            <Grid item key={eachEvent._id}>
              <Card xs={12} md={6} lg={4}>
                <Typography variant="h4">{eachEvent.title}</Typography>
          
                <CardMedia>
                {eachEvent.image && ( <img src={eachEvent.image} alt={eachEvent.name}/>  )}
                </CardMedia>
                
                <Button href="#text-buttons">
                  <Link to={`/events/${eachEvent._id}`}>{eachEvent.title}</Link>
                </Button>
              </Card>
            </Grid>
          );
        })
      }
    </Grid>
  </Container>
); */
