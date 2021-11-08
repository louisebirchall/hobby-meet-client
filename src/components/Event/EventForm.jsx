import React, { Component } from "react";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import eventService from "../../services/event-service";

class EventForm extends Component {
  state = {
    eventImage: "",
    title: "",
    description: "",
    equipment: "",
    date: "",
    owner_id: "",
    attendees: "",
    attendees_max: "",
    attendees_min: "",
    pricePolicy: "",
    price: "",
    location: "",
    organizedBy: "",
    charity_id: "",
    // post_id: "" etc
    imageIsUploading: false,
  };

  handleChange = (event) => {
    // console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      eventImage,
      title,
      description,
      equipment,
      date,
      owner_id,
      attendees,
      attendees_max,
      attendees_min,
      pricePolicy,
      price,
      location,
      organizedBy,
      charity_id,
    } = this.state;
    const { id } = this.props.match.params;

    if (this.props.isEdit) {
      eventService
        .edit(
          id,
          eventImage,
          title,
          description,
          equipment,
          date,
          owner_id,
          attendees,
          attendees_max,
          attendees_min,
          pricePolicy,
          price,
          location,
          organizedBy,
          charity_id
        )
        .then(() => {
          this.props.history.push("/"); // ! to events/:id/details
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    } else {
      eventService
        .create(
          eventImage,
          title,
          description,
          equipment,
          date,
          owner_id,
          attendees,
          attendees_max,
          attendees_min,
          pricePolicy,
          price,
          location,
          organizedBy,
          charity_id
        )
        .then(() => {
          this.props.history.push("/"); // ! or /events?
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    }
  };

  handleImageUpload = (event) => {
    this.setState({ imageIsUploading: true });

    const uploadData = new FormData();
    uploadData.append("eventImage", event.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_SERVER_API}/upload`, uploadData)
      .then((result) => {
        this.setState({
          eventImage: result.data.imagePath,
          imageIsUploading: false,
        }); // ! what's imagePath? don't remember
      })
      .catch(() => {
        this.props.history.push("/500");
      });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      eventService
        .getEvent(id)
        .then((result) => {
          this.setState({
            eventImage: result.data.eventImage,
            title: result.data.title,
            description: result.data.description,
            equipment: result.data.equipment,
            date: result.data.date,
            owner_id: result.data.owner_id,
            attendees: result.data.attendees,
            attendees_max: result.data.attendees_max,
            attendees_min: result.data.attendees_min,
            pricePolicy: result.data.pricePolicy,
            price: result.data.price,
            location: result.data.location,
            organizedBy: result.data.organizedBy,
            charity_id: result.data.charity_id,
          });
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    }
  }

  render() {
    const {
      eventImage,
      title,
      description,
      equipment,
      date,
      owner_id,
      attendees,
      attendees_max,
      attendees_min,
      pricePolicy,
      price,
      location,
      organizedBy,
      charity_id,
      imageIsUploading,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Event title </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="title"
            value={title} // ! sat 6 got this far
          />
          <br />
          <label htmlFor="typeOfActivity">Type of Activity </label>
          <input
            onChange={this.handleChange}
            type="text" // ! what type as it's an option?
            name="typeOfActivity"
            value={typeOfActivity}
          />
          <br />
          <label htmlFor="description">Description </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="description"
            value={description}
          />
          <br />
          <div>
            {eventImage && <img src="{hobbyImage}" alt="Hobby image upload" />}
            <PuffLoader
              loading={imageIsUploading}
              size="100px"
              color="orchid"
            />
            {/* // ! input still in div, right? */}
            <label htmlFor="eventImage">Representative image </label>
            <input
              onChange={this.handleImageUpload}
              type="file"
              name="event image"
            />
          </div>

          <br />
          <label htmlFor="placeOfActivity">
            Where shall we hold this event?{" "}
          </label>
          <input
            onChange={this.handleChange}
            type="text" // ! what type is it?
            name="placeOfActivity"
            value={placeOfActivity}
          />
          <br />
          <button type="submit" disabled={imageIsUploading}>
            Add this event
          </button>
        </form>
      </div>
    );
  }
}

export default EventForm;
