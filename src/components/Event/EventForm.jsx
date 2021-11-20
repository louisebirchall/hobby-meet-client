import React, { Component } from "react";
import { PuffLoader } from "react-spinners";
import eventService from "../../services/event-service";
import imageService from "../../services/image-service";

class EventForm extends Component {
  state = {
    image: "",
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
    imageIsUploading: false,
  };

  handleChange = (event) => {
    // console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      image,
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
          image,
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
          this.props.history.push("/events/_id"); // ! to events/:id/details
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    } else {
      eventService
        .create(
          image,
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
          this.props.history.push("/events"); // ! or /events?
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

    imageService.upload(uploadData)
      .then((result) => {
        this.setState({
          image: result.data.imagePath,
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
            image: result.data.image,
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
      image,
      title,
      description,
      equipment,
      date,
      owner_id,
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
            value={title} 
          />
      
          <label htmlFor="description">Description </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="description"
            value={description}
          />
  
          <div>
            {image && <img src={image} alt=" " />}
            <PuffLoader
              loading={imageIsUploading}
              size="100px"
              color="orchid"
            />
            {/* // ! input still in div, right? */}
            <label htmlFor="image">Representative image </label>
            <input
              onChange={this.handleImageUpload}
              type="file"
              name="event image"
            />
          </div>

          <label htmlFor="equipment">Required equipment </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="equipment"
            value={equipment}
          />
       
          <label htmlFor="placeOfActivity">
            Where shall we hold this event?
          </label>
          <input
            onChange={this.handleChange}
            type="text" // ! what type is it?
            name="location"
            value={location}
          />
     
     
          <label htmlFor="date">Date </label>
          <input
            onChange={this.handleChange}
            type="date"
            name="date"
            value={date}
          />

          <label htmlFor="owner_id">Who's in charge? </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="owner_id"
            value={owner_id}
          />
  
          <label htmlFor="attendees_max">Maximum number of attendees </label>
          <input
            onChange={this.handleChange}
            type="number"
            name="attendees_max"
            value={attendees_max}
          />
 
          <label htmlFor="attendees_min">
            Set minimum number of attendees (if required)
          </label>
          <input
            onChange={this.handleChange}
            type="number"
            name="attendees_min"
            value={attendees_min}
          />
   
          <label htmlFor="pricePolicy">Price Policy </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="pricePolicy"
            value={pricePolicy}
          />
  
          <label htmlFor="price">Price </label>
          <input
            onChange={this.handleChange}
            type="number"
            name="price"
            value={price}
          />
  
          <label htmlFor="organizedBy">Who is the organiser? </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="organizedBy"
            value={organizedBy}
          />

          <label htmlFor="charity_id">Which Charity is it for? </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="charity_id"
            value={charity_id}
          />

          <button type="submit" disabled={imageIsUploading}>
            Add this event
          </button>

        </form>
      </div>
    );
  }
}

export default EventForm;
