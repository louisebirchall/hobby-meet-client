import React, { Component } from "react";
import { Link } from "react-router-dom";
import eventService from "../../services/event-service";
import AddPostForm from "../AddPostForm";
import EditPostForm from "../Posts/EditPostForm";
import ReviewForm from "../ReviewForm";
import {Container, Button,  Typography, Card, CardContent, Box, CardMedia} from '@material-ui/core'
import reviewService from "../../services/review-service";



class EventDetails extends Component {
  state = {
    singleEvent: null,
    isLoading: true,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    eventService
    .getEvent(id)
      .then((response) => {
        this.setState({ singleEvent: response.data, isLoading: false });
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  }

  handleDelete = () => {
    const { id } = this.props.match.params;
    eventService
    .delete(id)
      .then((data) => {
        this.props.history.push("/events"); // to check if /events here
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  };

  

  render() {
    const { isLoading, singleEvent } = this.state;
    const { id } = this.props.match.params;

    return (
      <Container align="justify" style={{ paddingBottom: 60 }}>
        <Card sx={{ display: "flex" }}>
          {isLoading && <h1>...Loading</h1>}

          {!isLoading && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography variant="h2">{singleEvent.title}</Typography>

                <CardMedia>
                  {singleEvent.image && (
                    <img src={singleEvent.image} alt={singleEvent.name} />
                  )}
                </CardMedia>

                <Typography>Description: {singleEvent.description} </Typography>

                <Typography>Where: {singleEvent.location} </Typography>

                <Typography> Date:{singleEvent.date} </Typography>

                <Typography>
                  Equipment required: {singleEvent.equipment}{" "}
                </Typography>

              <Typography>Organizer : {singleEvent.user_id}</Typography>

                <Typography>Organizer : {singleEvent.owner_id}</Typography>

                <Typography> Attending: {singleEvent.attendees}</Typography>

                <Typography>
                  Maximum attendees: {singleEvent.attendees_max}{" "}
                </Typography>

              <Typography> price: {singleEvent.price} </Typography>
  
              <Button component={Link} to="/events/create">
              Create!
            </Button>

              <Button component={Link} to={`/events/${singleEvent._id}/edit`}>
                Edit
              </Button>
              
              <Button onClick={this.handleDelete}>Delete</Button>

            </CardContent>
          </Box>
        )}
        </Card>

        <AddPostForm id={id} service={eventService} />
        {/* <EditPostForm id={id} service={charityService} /> */}

        <ReviewForm id={id} service={reviewService} />
      </Container>
    );
  }
}

export default EventDetails;