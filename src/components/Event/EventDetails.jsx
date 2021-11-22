import React, { Component } from "react";
import { Link } from "react-router-dom";
import eventService from "../../services/event-service";
import AddPostForm from "../AddPostForm";
import EditPostForm from "../Posts/EditPostForm";
import ReviewForm from "../ReviewForm";
import {Container, Button,  Typography} from '@material-ui/core'
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
   
      <Container>
        
        {isLoading && <h1>...Loading</h1>}

        {!isLoading && (
          <>
              <Typography variant="h2">{singleEvent.title}</Typography>           
              
              {singleEvent.image && ( <img src={singleEvent.image} alt={singleEvent.name}/> )}
              
              <Typography>Description: {singleEvent.description} </Typography>

              <Typography>Where: {singleEvent.location} </Typography>

              <Typography> Date:{singleEvent.date} </Typography>

              <Typography>Equipment required: {singleEvent.equipment} </Typography>

              <Typography> Category: {singleEvent.hobby_id}</Typography>

              <Typography>Organizer : {singleEvent.owner_id}</Typography>

              <Typography> Attending: {singleEvent.attendees}</Typography>

              <Typography>Maximum attendees: {singleEvent.attendees_max} </Typography>

              <Typography> In aid of {singleEvent.charity_id} </Typography>

              <Typography> price: {singleEvent.price} </Typography>
  
              <Button component={Link} to={`/events/${singleEvent._id}/edit`}>
                Edit
              </Button>
              
              <Button onClick={this.handleDelete}>Delete</Button>


              <AddPostForm id={id} service={eventService} />
              {/* <EditPostForm id={id} service={charityService} /> */}

              <ReviewForm id={id} service={reviewService} />
          </>
        )}

      </Container>

    );
  }
}

export default EventDetails;