import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import eventService from "../../services/event-service";
import AddPostForm from "../Posts/AddPostForm";
import EditPostForm from "../Posts/EditPostForm";
import ReviewForm from "../ReviewForm";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  CardMedia,
  Grid,
  Link,
} from "@material-ui/core";
import Payment from "../Payment/Payment";
import DeleteIcon from "@mui/icons-material/Delete";
import { PuffLoader } from "react-spinners";
import Map from "./Map";

class EventDetails extends Component {
  state = {
    singleEvent: null,
    isLoading: true,
  };

  handleClick = (item) => {
    this.setState({ itemToBuy: item });
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

  handleAttend = () => {
    const { id } = this.props.match.params;
    eventService
      .attend(id)
      .then((response) => {
        this.setState({ singleEvent: response.data.event });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleNewData = (data) => {
    this.setState({ singleEvent: data.event });
  };




  render() {
    const { isLoading, singleEvent, itemToBuy } = this.state;
    const { user } = this.props;
    const formattedDate = singleEvent && new Date(singleEvent.date);
    const userIsAttending =
      user &&
      singleEvent?.attendees?.some((attendee) => attendee._id === user._id);
    const { id } = this.props.match.params;
    const isOwner = user?._id === singleEvent?.user_id?._id;

    return (
      <Container style={{ paddingBottom: 60 }}>
        <Card sx={{ display: "flex" }}>
          {isLoading && <PuffLoader size="100px" color="orchid" />}

          {!isLoading && singleEvent && (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography variant="h2">{singleEvent.title}</Typography>

                <CardMedia>
                  {singleEvent.image && (
                    <img
                      src={singleEvent.image}
                      alt={singleEvent.title}
                      style={{ width: 300 }}
                    />
                  )}
                </CardMedia>

                <Typography>Description: {singleEvent.description} </Typography>

                {/* <Typography>Where: {singleEvent.location} </Typography> */}

                <Typography>
                  Date: {formattedDate.toLocaleDateString()}
                  {formattedDate.toLocaleTimeString()}
                </Typography>

                <Typography>
                  Equipment required: {singleEvent.equipment}
                </Typography>

                {/* <Map /> */}

                <Typography>
                  Organizer:
                  <Link
                    component={RouterLink}
                    to={`/users/${singleEvent.user_id._id}`}
                  >
                    {singleEvent.user_id.username}
                  </Link>
                </Typography>

                <Typography>
                  Attending:
                  {singleEvent.attendees.map((attendee) => {
                    return (
                      <Link
                        component={RouterLink}
                        to={`/users/${attendee._id}`}
                      >
                        {attendee.username}
                      </Link>
                    );
                  })}
                </Typography>

                {singleEvent.attendees_max && (
                  <Typography>
                    Maximum attendees: {singleEvent.attendees_max}
                  </Typography>
                )}

                {singleEvent.attendees_min && (
                  <Typography>
                    Minimum attendees: {singleEvent.attendees_min}
                  </Typography>
                )}

                <Typography>Price policy: {singleEvent.pricePolicy}</Typography>

                <Typography> Price: {singleEvent.price} €</Typography>

                <Box sx={{ flexGrow: 1 }} />
                {userIsAttending && (
                  <>
                    <span style={{ backgroundColor: "#3aefd5" }}>
                      You're attending this event.
                    </span>
                    <Link onClick={this.handleAttend}>Remove</Link>
                  </>
                )}
                {!userIsAttending && (
                  <Button
                    onClick={this.handleAttend}
                    color="primary"
                    variant="contained"
                  >
                    Attend!
                  </Button>
                )}

                <Box sx={{ flexGrow: 1 }} />

                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.handleClick(singleEvent)}
                  href={"/products/payments/create-payment-intent"}
                >
                  <Typography component="div" variant="p">
                    Pay to go!
                  </Typography>
                </Button>
                {itemToBuy && itemToBuy._id === singleEvent._id && (
                  <Payment itemToBuy={singleEvent} />
                )}

                <Box sx={{ flexGrow: 1 }} />
                {isOwner && (
                  <Grid container spacing={3}>
                    <Button
                      color="secondary"
                      variant="contained"
                      component={Link}
                      // onClick={this.}
                      to={`/events/${singleEvent._id}/edit`}
                    >
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      component={Link}
                      startIcon={<DeleteIcon />}
                      onClick={this.handleDelete}
                    >
                      Delete
                    </Button>
                  </Grid>
                )}
              </CardContent>
            </Box>
          )}
        </Card>

        <AddPostForm
          id={id}
          service={eventService}
          saveUpdatedData={this.handleNewData}
        />
        {singleEvent &&
          singleEvent.posts.map((post) => <p>{post.description}</p>)}

        {/* <ReviewForm id={id} service={reviewService} /> */}
      </Container>
    );
  }
}

export default EventDetails;
