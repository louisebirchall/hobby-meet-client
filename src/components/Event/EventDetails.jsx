import React, { Component } from "react";
import { Link } from "react-router-dom";
import eventService from "../../services/event-service";
import AddPostForm from "../AddPostForm";
import ReviewForm from "../ReviewForm";
import reviewService from "../../services/review-service";
import {
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  CardMedia,
} from "@material-ui/core";

import authService from "../../services/auth-service";

const user = authService.getUser()
// does this need a promise?

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
        this.props.history.push("/events");
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  };

  render() {
    const { isLoading, singleEvent } = this.state;
    const formattedDate = singleEvent && new Date(singleEvent.date);
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
                    <img src={singleEvent.image} alt={singleEvent.title} />
                  )}
                </CardMedia>

                <Typography>Description: {singleEvent.description} </Typography>

                <Typography>Where: {singleEvent.location} </Typography>

                <Typography>
                  {" "}
                  Date:{formattedDate.toLocaleDateString()}{" "}
                  {formattedDate.toLocaleTimeString()}{" "}
                </Typography>

                <Typography>
                  Equipment required: {singleEvent.equipment}
                </Typography>

                <Typography>Organizer: {singleEvent.organizedBy}</Typography>

                <Typography>
                  Maximum attendees: {singleEvent.attendees_max}{" "}
                </Typography>

                <Typography>
                  Minimum attendees: {singleEvent.attendees_min}{" "}
                </Typography>

                <Typography> Price policy: {singleEvent.pricePolicy} </Typography>

                <Typography> price: {singleEvent.price} </Typography>


                <Button component={Link} to="/events/create">
                  Create!
                </Button>

                <Button component={Link} to={`/events/${singleEvent._id}/edit`}>
                  Edit
                </Button>

                <Button component={Link} to={`/profile/${user.id}`}>
                  Attend Event
                </Button>

                <Button onClick={this.handleDelete}>Delete</Button>
              </CardContent>
            </Box>
          )}
        </Card>

        <AddPostForm id={id} service={eventService} />

        <ReviewForm id={id} service={reviewService} />
      </Container>
    );
  }
}

export default EventDetails;
