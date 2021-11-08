import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class EventDetails extends Component {
  state = {
    singleEvent: null,
    isLoading: true,
  };

  componentDidMount() {
    axios
      .get( // ! is route correct?
        `${process.env.REACT_APP_SERVER_API}/events/${this.props.match.params.id}`
      )
      .then((response) => {
        this.setState({ singleEvent: response.data, isLoading: false });
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  }

  handleDelete = () => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_API}/events/${this.props.match.params.id}`
      )
      .then((data) => {
        this.props.history.push("/");
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  };

  render() {
    const { isLoading, singleEvent } = this.state;

    return (
      <div>
        <h2>{singleEvent.title}</h2>
        {isLoading && <h1>...Loading</h1>}

        {!isLoading && (
          <div>
            {singleEvent.eventImage && <img src={singleEvent.eventImage} />}
            {/* alt=`${singleHobby.name}` */}
            <p>Description: {singleEvent.description} </p>
            <p>Where: {singleEvent.location} </p>
            <p>
              Date:{singleEvent.date}, Equipment required:
              {singleEvent.equipment}, Category: {singleEvent.hobby_id}
            </p>
            <p> </p>
            <p>Organiser : {singleEvent.owner_id}</p>
            <p>
              Attending: {singleEvent.attendees} - Maximum attendees:{" "}
              {singleEvent.attendees_max}
            </p>
            <p>
              In aid of {singleEvent.charity_id}, price: {singleEvent.price}
            </p>

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
            <Link to={`/todo/${singleEvent._id}/edit`}>
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
