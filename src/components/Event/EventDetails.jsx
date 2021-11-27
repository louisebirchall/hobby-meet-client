import React, { Component } from "react";
import { Link } from "react-router-dom";
import eventService from "../../services/event-service";
import AddPostForm from "../AddPostForm";
import EditPostForm from "../Posts/EditPostForm";
import ReviewForm from "../ReviewForm";
import {Container, Button,  Typography, Card, CardContent, Box, CardMedia} from '@material-ui/core'
import reviewService from "../../services/review-service";
import userService from "../../services/user-service";

import Payment from "../Payment/Payment"

import DeleteIcon from '@mui/icons-material/Delete';

class EventDetails extends Component {
  state = {
    singleEvent: null,
    isLoading: true,
  };

  handleClick = (item) => {
    this.setState({itemToBuy: item})
  }

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

  handleNewData = (data) => {
    this.setState({ singleEvent: data.event });
  };

  render() {
    const { isLoading, singleEvent, itemToBuy } = this.state;
    const formattedDate = singleEvent && new Date(singleEvent.date)
    
    const { id } = this.props.match.params;

    return (
      <Container style={{ paddingBottom: 60 }}>
        <Card sx={{ display: "flex" }}>
          {isLoading && <h1>...Loading</h1>}

          {!isLoading && (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  Date: {formattedDate.toLocaleDateString()}{" "}
                  {formattedDate.toLocaleTimeString()}{" "}
                </Typography>

                <Typography>
                  Equipment required: {singleEvent.equipment}{" "}
                </Typography>

                <Typography>Organizer: {singleEvent.organizedBy}</Typography>

                <Typography> Attending: {singleEvent.attendees}</Typography>

                <Typography>
                  Maximum attendees: {singleEvent.attendees_max}{" "}
                </Typography>

                <Typography>
                  Minimum attendees: {singleEvent.attendees_min}{" "}
                </Typography>

                <Typography> Price policy: {singleEvent.pricePolicy} </Typography>

                <Typography> price: {singleEvent.price} </Typography>
            
  
             

              {/* <Button component={Link} to={`/events/${singleEvent._id}/edit`}>
                Edit
              </Button> */}
              <Button
              color="primary" variant="contained"
              >
                  Attend!
              </Button>
              <Button color="primary"
                  variant="contained" onClick={() => this.handleClick(singleEvent)} href={'/products/payments/create-payment-intent'}>
                  <Typography component="div" variant="p">
                  Pay to go!</Typography></Button>
                      {itemToBuy && itemToBuy._id === singleEvent._id && <Payment itemToBuy={singleEvent}/>}


              <Box sx={{ flexGrow: 1 }} />

              <Button
                color="secondary" variant="contained"
                  component={Link}
                  to={`/events/${singleEvent._id}/edit`}
                >
                  {" "}
                  Edit{" "}
                </Button>


              <Button color="secondary" variant="contained" startIcon={<DeleteIcon />} onClick={this.handleDelete}>Delete</Button>
              
            </CardContent>
          </Box>
        )}
        </Card>
        
 
        <AddPostForm id={id} service={eventService}   saveUpdatedData={this.handleNewData} />
        {singleEvent &&
          singleEvent.posts.map((post) => <p>{post.description}</p>)}

        {/* <ReviewForm id={id} service={reviewService} /> */}
      </Container>
    );
  }
}

export default EventDetails;