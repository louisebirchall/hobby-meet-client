import React, { Component } from "react";
import eventService from "../../services/event-service";
import generalService from "../../services/general-service";
import { PuffLoader } from "react-spinners";

// textfield / form
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

// input for selecting pricePolicy 
const pricePolicy = [
    //   {
    //     value: 'FixedPrice',
    //     label: 'Fixed Price',
    //   },
    //   {
    //    value: 'Free',
    //    label: 'Free',
    //   },
    //   {
    //     value: 'Voluntary',
    //     label: 'Voluntary',
    //   }
]

// input for selecting organizedBy 
const organizedBy = [
    //   {
    //     value: 'Charity',
    //     label: 'Charity',
    //   },
    //   {
    //    value: 'Company',
    //    label: 'Company',
    //   },
    //   {
    //     value: 'User',
    //     label: 'User',
    //   }
]

class EventForm extends Component {
  state = {
    image: "",
    title: "",
    description: "",
    equipment: "",
    date: "",
    user_id: "",
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

  handleImageUpload = (event) => {
    this.setState({ imageIsUploading: true });

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    generalService
      .upload(uploadData)
      .then((result) => {
        this.setState({
          image: result.data.imagePath,
          imageIsUploading: false,
        });
      })
      .catch(() => this.props.history.push("/500"));
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
      user_id,
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
          user_id,
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
          this.props.history.push(`/events/${id}`);
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
          user_id,
          attendees,
          attendees_max,
          attendees_min,
          pricePolicy,
          price,
          location,
          organizedBy,
          charity_id
        )
        .then((response) => {
          this.props.history.push(`/events/${response.data._id}`);
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    }
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
            user_id: result.data.user_id,
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
      user_id,
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
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <form onSubmit={this.handleSubmit}>
          {image && <img src={image} alt="eventpic" width="150px" />}
          <PuffLoader loading={imageIsUploading} size="100px" color="orchid" />
          <label htmlFor="image">Representative image </label>
          <input
            onChange={this.handleImageUpload}
            type="file"
            name="event image"
          />

          <TextField
            onChange={this.handleChange}
            id="outlined-basic"
            label="Event title"
            variant="outlined"
            name="title"
            value={title}
          />

          <TextField
            onChange={this.handleChange}
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={4}
            variant="outlined"
            name="description"
            value={description}
          />

          <TextField
            onChange={this.handleChange}
            id="outlined-basic"
            label="Required equipment"
            variant="outlined"
            name="equipment"
            value={equipment}
          />

          <TextField
            onChange={this.handleChange}
            id="outlined-basic"
            label="Where shall we hold this event?"
            variant="outlined"
            name="location"
            value={location}
          />
          
          <TextField
            onChange={this.handleChange}
            id="outlined-basic"
            label="Date"
            variant="outlined"
            name="date"
            value={date}
          />
          
          {/* not needed as textfield? */}
          <TextField
            onChange={this.handleChange}
            id="outlined-basic"
            label="Who's in charge?"
            variant="outlined"
            name="user_id"
            value={user_id}
          />

          <TextField
            //  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={this.handleChange}
            id="outlined-basic"
            label="Maximum number of attendees"
            variant="outlined"
            name="attendees_max"
            type="number"
            value={attendees_max}
          />

          <TextField
            //  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={this.handleChange}
            id="outlined-basic"
            label="Set minimum number of attendees (if required)"
            variant="outlined"
            name="attendees_min"
            type="number"
            value={attendees_min}
          />

          <TextField
            id="outlined-select"
            select
            label="Please select the type of price Policy."
            value={pricePolicy}
            onChange={this.handleChange}
            // helperText="Please select the type of price Policy."
          >
            {/* {pricePolicy.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem> 
          ))}  */}
          </TextField>

          <TextField
            //  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={this.handleChange}
            id="outlined-basic"
            label="€"
            variant="outlined"
            name="price"
            type="number"
            value={price}
            //helperText="€"
            placeholder="€"
          />

          <TextField
            id="outlined-select"
            select
            label="Who is the organizer?"
            value={organizedBy}
            onChange={this.handleChange}
          >
            {/* {organizer.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem> 
          ))}  */}
          </TextField>

          <TextField
            id="outlined-select"
            select
            label="Which Charity is it for?"
            value={charity_id}
            onChange={this.handleChange}
          >
            {/* {charities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem> 
          ))}  */}
          </TextField>

          <button type="submit" disabled={imageIsUploading}>
            Add this event!
          </button>

          <button type="submit" disabled={imageIsUploading}>
            Save changes!
          </button>
        </form>

        <p>Do you want to delete this event?</p>
        <button type="submit" disabled={imageIsUploading}>
          {" "}
          Delete{" "}
        </button>
      </Box>
    );
  }
}

export default EventForm;
