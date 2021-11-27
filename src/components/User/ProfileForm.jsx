import React, { Component } from "react";
import userService from "../../services/user-service";
import generalService from "../../services/general-service";
import { PuffLoader } from "react-spinners";

// textfield / form
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl, Input, InputLabel } from "@mui/material";
import { Button } from "@material-ui/core";
import { Card } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";

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
          this.props.history.push(`/users/${id}`);
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    } else {
      userService
        .create(id, username, email, fullName, image, sex, age, isAdmin, type)
        .then((response) => {
          this.props.history.push(`/users/${response.data._id}`);
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
      <Container align="justify" style={{ paddingBottom: 60 }}>
        <Card>
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "50ch" },
              "& .MuiTextField-root": { m: 1, width: "50ch" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            noValidate
            autoComplete="off"
          >
          <div align="center">
              {" "}
              <h2>Profile Changes</h2>
              <h3>Please update your profile</h3>
              </div>
            <form onSubmit={this.handleSubmit}>
              <div align="center">
              {image && <img style={{borderRadius: 100, marginBottom: 10}} src={image} alt="postImg" width="150px" />}
              <PuffLoader
                loading={imageIsUploading}
                size="100px"
                color="orchid"
              />
              </div>

<div align="center">
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      type="file"
                      onChange={this.handleImageUpload}
                    />
                    {/* <Button onChange={this.handleImageUpload} variant="contained" component="span">
                Upload
              </Button> */}
                  </label>
                </div>

              {/* <input
                onChange={this.handleImageUpload}
                type="file"
                name="image"
              /> */}

              <TextField
                style={{ marginTop: 20 }}
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
                label="Full name"
                variant="outlined"
                name="fullName"
                value={fullName}
              />
              <TextField
                onChange={this.handleChange}
                id="outlined-basic"
                label="@"
                variant="outlined"
                name="email"
                value={email}
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

              <FormControl sx={{ m: 1, width: 530 }}>
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

              <FormControl sx={{ m: 1, width: 530 }}>
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
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  color="primary"
                  variant="outlined"
                  type="submit"
                  disabled={imageIsUploading}
                >
                  Save changes!
                </Button>
              </div>
            </form>
            <div align="center" style={{ marginBottom: 30}}>
              <p>Do you want to delete your profile?</p>
              <Button
                color="secondary"
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={this.handleDelete}
              >
                Delete
              </Button>
            </div>
          </Box>
        </Card>
      </Container>
    );
  }
}

export default ProfileFom;
