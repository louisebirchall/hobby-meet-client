import React, { Component } from "react";
import { Link } from "react-router-dom";
import eventService from "../../services/event-service";
import AddPostForm from "../Posts/AddPostForm";
import EditPostForm from "../Posts/EditPostForm";
import ReviewForm from "../ReviewForm";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  CardMedia,
  Grid,
} from "@material-ui/core";
import Payment from "../Payment/Payment";
import DeleteIcon from "@mui/icons-material/Delete";
import { PuffLoader } from "react-spinners";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

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
      singleEvent &&
      singleEvent.attendees &&
      singleEvent.attendees.includes(user._id);
    const { id } = this.props.match.params;

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

                <Typography>Where: {singleEvent.location} </Typography>

                {/* <MapContainer
                  center={[51.505, -0.09]}
                  zoom={13}
                  scrollWheelZoom={false}
                >
                  <TileLayer
<<<<<<< HEAD
                    
=======
>>>>>>> abd0ec47dee7a9a0a99db194fd3fa17910d7852e
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[51.505, -0.09]}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </MapContainer> */}

                <Typography>
                  Date: {formattedDate.toLocaleDateString()}
                  {formattedDate.toLocaleTimeString()}
                </Typography>

                <Typography>
                  Equipment required: {singleEvent.equipment}
                </Typography>

                <Typography>Organizer: {singleEvent.organizedBy}</Typography>

                <Typography> Attending: {singleEvent.attendees}</Typography>

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
                  <span style={{ backgroundColor: "#3aefd5" }}>
                    You're attending this event.
                  </span>
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
                <Grid container spacing={3}>
                  <Button
                    color="secondary"
                    variant="contained"
                    component={Link}
                    to={`/events/${singleEvent._id}/edit`}
                  >
                    {" "}
                    Edit{" "}
                  </Button>

                  <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={this.handleDelete}
                  >
                    Delete
                  </Button>
                </Grid>
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
