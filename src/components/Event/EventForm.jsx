import React, { Component } from "react";
import eventService from "../../services/event-service";
import generalService from "../../services/general-service";
import { PuffLoader } from "react-spinners";

// textfield / form
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel, Select } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterDateFns";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

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
      <Container>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
        style={{ paddingBottom: 60 }}
      >
        <LocalizationProvider dateAdapter={DateAdapter}></LocalizationProvider>
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

          {/* <TextField
            onChange={this.handleChange}
            id="outlined-basic"
            label="Date"
            variant="outlined"
            name="date"
            value={date}
          /> */}

          {/* error */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DateTimePicker
                label="Date&Time picker"
                value={date}
                name="date"
                onChange={this.handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>

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

          {/*  <TextField
            id="outlined-select"
            select
            label="Please select the type of price Policy."
            value={pricePolicy}
            onChange={this.handleChange}
            // helperText="Please select the type of price Policy."
          >
            {pricePolicy.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem> 
          ))}  
          </TextField>*/}

          <FormControl sx={{ m: 1, width: 400 }}>
            <InputLabel id="demo-multiple-name-label">
              Please select the price policy.
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pricePolicy}
              label="Please select the price policy."
              name="pricePolicy"
              onChange={this.handleChange}
            >
              <MenuItem value="Fixed Price">Fixed Price</MenuItem>
              <MenuItem value="Free">Free</MenuItem>
              <MenuItem value="Voluntary">Voluntary</MenuItem>
            </Select>
          </FormControl>

          <TextField
            //  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={this.handleChange}
            id="outlined-basic"
            label="€"
            variant="outlined"
            name="price"
            type="number"
            value={price}
            placeholder="€"
          />

          <FormControl sx={{ m: 1, width: 400 }}>
            <InputLabel id="demo-multiple-name-label">
              Who is the organizer?
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={organizedBy}
              label="Who is the organizer?"
              name="organizedBy"
              onChange={this.handleChange}
            >
              <MenuItem value="Charity">Charity</MenuItem>
              <MenuItem value="Company">Company</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </FormControl>

          {/* causes error 500 */}
          <FormControl sx={{ m: 1, width: 400 }}>
            <InputLabel id="demo-multiple-name-label">
              Which Charity is it for?
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={charity_id}
              label="Which Charity is it for?"
              name="charity_id"
              onChange={this.handleChange}
            >
              <MenuItem value="won't have options to select from db">
                won't have options to select from db
              </MenuItem>
              <MenuItem value="charities need to be hardcoded in here">
                charities need to be hardcoded in here
              </MenuItem>
            </Select>
          </FormControl>

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
      </Container>
    );
  }
}

export default EventForm;
