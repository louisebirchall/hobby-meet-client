import React, { Component } from "react";
import { Link } from "react-router-dom";
import eventService from "../../services/event-service";
import AddPostForm from "../AddPostForm";
import reviewService from "../../services/review-service";
import EditPostForm from "../Posts/EditPostForm";
import ReviewForm from "../ReviewForm";


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
    eventService.delete
      .then((data) => {
        this.props.history.push("/");
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  };

  render() {
    const { isLoading, singleEvent } = this.state;
    const { id } = this.props.match.params;

    return (
      <div>
        
        {isLoading && <h1>...Loading</h1>}

        {!isLoading && (
          <div>
            <h2>{singleEvent.title}</h2>
            
            {singleEvent.image && ( <img src={singleEvent.image} alt="" />  )}
            <p>Description: {singleEvent.description} </p>
            <p>Where: {singleEvent.location} </p>
            <p> Date:{singleEvent.date} </p>
            <p>Equipment required: {singleEvent.equipment} </p>
            <p> Category: {singleEvent.hobby_id}</p>
            <p>Organizer : {singleEvent.owner_id}</p>
            <p> Attending: {singleEvent.attendees}</p>
            <p>Maximum attendees: {singleEvent.attendees_max} </p>
            <p> In aid of {singleEvent.charity_id} </p>
            <p> price: {singleEvent.price} </p>

            <AddPostForm id={id} service={eventService} />

            {/* <EditPostForm id={id} service={charityService} /> */}

            <br/>
            <ReviewForm id={id} service={reviewService} />

            {/* 
            form for posts if wanted
            <div>
            <h2>Add a new post</h2>

                  <form action="/posts/add" method="POST">
                    <label for="title">Comment</label>
                    <input type="text" name="title" />
                    <br />
                    <label for="description">Description</label>
                    <br />
                    <textarea name="description" id="" cols="30" rows="10"></textarea>
                    <br />

                    <label for="creator">Who are you?</label>
                    <select name="creator" id="">
                    </select>

                    <button type="submit">Add your knee-jerk opinions!</button>
                  </form>
                </div> */}
            <Link to={`/events/${singleEvent._id}/edit`}>
              <button>Edit</button>
            </Link>
            
            <button onClick={this.handleDelete}>Delete</button>
          </div>
        )}
      </div>
    );
  }
}

export default EventDetails;