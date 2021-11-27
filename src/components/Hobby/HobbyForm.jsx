import React, { Component } from "react";
import hobbyService from "../../services/hobby-service";
import generalService from "../../services/general-service";
import { PuffLoader } from "react-spinners";

// textfield / form
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import { Card, FormControl, InputLabel, Select } from "@mui/material";
import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";

class HobbyForm extends Component {
  state = {
    name: "",
    typeOfActivity: "",
    description: "",
    image: "",
    placeOfActivity: "",
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
      .catch(() => {
        this.props.history.push("/500");
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      //[event.target.value]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, typeOfActivity, description, placeOfActivity, image } =
      this.state;
    const { id } = this.props.match.params;

    if (this.props.isEdit) {
      hobbyService
        .edit(id, name, typeOfActivity, description, placeOfActivity, image)
        .then(() => {
          this.props.history.push(`/hobbies/${id}`);
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    } else {
      hobbyService
        .create(name, typeOfActivity, description, placeOfActivity, image)
        .then((response) => {
          // console.log("newly created hobby", response.data);
          this.props.history.push(`/hobbies/${response.data._id}`);
        })
        .catch((err) => {
          // console.log("charity creation", err)
          // this.props.history.push("/500");
        });
    }
  };

  // handleDelete = () => {
  //   const { id } = this.props.match.params;
  //   hobbyService
  //     .delete(id)
  //     .then((data) => {
  //       this.props.history.push("/hobbies");
  //     })
  //     .catch((err) => {
  //       this.props.history.push("/500");
  //     });
  // };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      hobbyService.getHobby(id).then((result) => {
        this.setState({
          name: result.data.name,
          typeOfActivity: result.data.typeOfActivity,
          description: result.data.description,
          image: result.data.image,
          placeOfActivity: result.data.placeOfActivity,
        });
      });
      // .catch((err) => {
      //   this.props.history.push("/500");
      // });
    }
  }

  render() {
    const {
      name,
      typeOfActivity,
      description,
      placeOfActivity,
      image,
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
          style={{ paddingBottom: 60 }}
        >
        <div align="center">
            {" "}
            <h2>Hobby Form</h2>
            <h3>Please enter your information</h3>
          </div>
          <form onSubmit={this.handleSubmit}>
            {image && <img src={image} alt="{name}" width="150" />}
            <PuffLoader
              loading={imageIsUploading}
              size="100px"
              color="orchid"
            />
            <div align="center">
            <label htmlFor="contained-button-file" >
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
            {/* <label htmlFor="image">Representative image </label>
            <input onChange={this.handleImageUpload} type="file" name="image" /> */}

            <TextField
              style={{ marginTop: 20 }}
              onChange={this.handleChange}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              value={name}
            />

            {/* <label htmlFor="name">Name </label>
          <input
            onChange={this.handleChange}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name"
            value={name}
          />


          {/* max 4 and then scrollbar, maybe limit the characters? */}
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


            <FormControl sx={{ m: 1, width: 530 }}>
              <InputLabel id="demo-multiple-name-label">
                Please select the type of the activity
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typeOfActivity}
                label="Please select the type of the activity"
                name="typeOfActivity"
                onChange={this.handleChange}
              >
                <MenuItem value="Sport">Sport</MenuItem>
                <MenuItem value="Craft">Craft</MenuItem>
                <MenuItem value="Workshop">Workshop</MenuItem>
                <MenuItem value="Music">Music</MenuItem>
                <MenuItem value="Art">Art</MenuItem>
                <MenuItem value="Manual">Manual</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Gardening">Gardening</MenuItem>
                <MenuItem value="MeetUp">MeetUp</MenuItem>
                <MenuItem value="Language">Language</MenuItem>
                <MenuItem value="Spiritual">Spiritual</MenuItem>
                <MenuItem value="Photography">Photography</MenuItem>
              </Select>
            </FormControl>

            

            <FormControl sx={{ m: 1, width: 530 }}>
              <InputLabel id="demo-multiple-name-label">
                Please select the place of the activity
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={placeOfActivity}
                label="Please select the place of the activity"
                name="placeOfActivity"
                onChange={this.handleChange}
              >
                <MenuItem value="Indoors">Indoors</MenuItem>
                <MenuItem value="Outdoors">Outdoors</MenuItem>
                <MenuItem value="Indoors/Outdoors">Indoors/Outdoors</MenuItem>
              </Select>
            </FormControl>

            {/*  <TextField
            id="outlined-select"
            select
            label="Please select the place of activity"
            value={placeOfActivity}
            onChange={this.handleChange}
          >
             {typeOfActivity.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))} 
          </TextField>*/}

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
                  Add this Hobby!
                </Button>

                <Button
                  color="secondary"
                  variant="outlined"
                  type="submit"
                  disabled={imageIsUploading}
                >
                  Save changes!
                </Button>
              </div>

            {/* <button type="submit" disabled={imageIsUploading}>
              Add this hobby!
            </button>

            <button type="submit" disabled={imageIsUploading}>
              Save changes!
            </button>

            <p>Do you want to delete this hobby?</p>
            <button type="submit" disabled={imageIsUploading}>
              {" "}
              Delete{" "}
            </button> */}

          </form>

        </Box>
        </Card>

      </Container>
    );
  }
}

export default HobbyForm;
