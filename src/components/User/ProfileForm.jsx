import React, { Component } from "react";
import userService from "../../services/user-service";
import generalService from "../../services/general-service";
import { PuffLoader } from "react-spinners";

// textfield / form
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from '@mui/material/Select';
import { FormControl, InputLabel } from "@mui/material";



class ProfileFom extends Component {
  state = {
    username: "",
    email: "",
    fullName: "",
    image: "",
    sex: "",
    age: "",
    isAdmin: "",
    type: "",
    hobbies: "",
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
    // console.log(event.target)
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, fullName, image, sex, age, isAdmin, type } =
      this.state;
    const { id } = this.props.match.params;
    if (this.props.isEdit) {
      userService
        .edit(id, username, email, fullName, image, sex, age, type)
        .then((newuser) => {
          console.log(newuser);
          this.props.history.push(`/profile/${id}`);
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    } else {
      userService
        .create(id, username, email, fullName, image, sex, age, isAdmin, type)
        .then((response) => {
          this.props.history.push(`/profile/${response.data._id}`);
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      userService
        .getUser(id)
        .then((result) => {
          this.setState({
            username: result.data.username,
            email: result.data.email,
            fullName: result.data.fullName,
            image: result.data.image,
            sex: result.data.sex,
            age: result.data.age,
            isAdmin: result.data.isAdmin,
            type: result.data.type,
          });
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    }
  }

  render() {
    const {
      username,
      email,
      fullName,
      image,
      sex,
      age,
      type,
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
      >
        <form onSubmit={this.handleSubmit}>
          {image && <img src={image} alt="postImg" width="150px" />}
          <PuffLoader loading={imageIsUploading} size="100px" color="orchid" />
          <input onChange={this.handleImageUpload} type="file" name="image" />

          <TextField
            onChange={this.handleChange}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            name="username"
            value={username}
          />

          <TextField
            onChange={this.handleChange}
            id="outlined-basic"
            label="@"
            variant="outlined"
            name="email"
            value={email}
          />

          <TextField
            onChange={this.handleChange}
            id="outlined-basic"
            label="Full name"
            variant="outlined"
            name="fullName"
            value={fullName}
          />

          {/* <label htmlFor="sex">Sex</label>
          <select
            onChange={this.handleChange}
            type="text"
            name="sex"
            value={sex}
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select> */}

          {/*<TextField
            id="outlined-select"
            select
            label="Sex"
            value={sex}
            onChange={this.handleChange}
            //helperText="Please select your sex."
          >
             {sex.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem> 
          ))}   
          </TextField>*/}

          <FormControl sx={{ m: 1, width: 400 }}>
          <InputLabel id="demo-multiple-name-label">Sex</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sex}
          label="Sex"
          name="sex"
          onChange={this.handleChange}
          >
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          </Select>
          </FormControl>
    
          

          <TextField
            //  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={this.handleChange}
            id="outlined-basic"
            label="Age"
            variant="outlined"
            name="age"
            type="number"
            value={age}
          />

          {/* <TextField
            id="outlined-select"
            select
            label="Type of user"
            value={type}
            onChange={this.handleChange}
            // helperText="Please select your sex."
          >
          {sex.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem> 
          ))}  
          </TextField> */}

          <FormControl sx={{ m: 1, width: 400 }}>
          <InputLabel id="label">Type of user</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          name="type"
          label="Type of user"
          onChange={this.handleChange}
          >
          <MenuItem value="Company">Company</MenuItem>
          <MenuItem value="User">User</MenuItem>
          </Select>
          </FormControl>

          <button type="submit" disabled={imageIsUploading}>
            Save changes!
          </button>
        </form>

        <p>Do you want to delete your profile?</p>
        <button type="submit" disabled={imageIsUploading}>
          Delete
        </button>
      </Box>
      </Container>
    );
  }
}

export default ProfileFom;
