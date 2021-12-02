import React, { Component } from "react";
import charityService from "../../services/charity-service";
import generalService from "../../services/general-service";
import { PuffLoader } from "react-spinners";

// textfield / form
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { Card } from "@material-ui/core";

class CharityForm extends Component {
  state = {
    name: "",
    description: "",
    image: "",
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
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, description, image } = this.state;
    const { id } = this.props.match.params;

    if (this.props.isEdit) {
      charityService
        .edit(id, name, description, image)
        .then(() => {
          this.props.history.push(`/charities/${id}`);
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    } else {
      charityService
        .create(name, description, image)
        .then((response) => {
          //console.log("newly created charity", response.data)
          this.props.history.push(`/charities/${response.data._id}`); // create or id of created oder list?
        })
        .catch((err) => {
          //console.log("charity creation", err)
          this.props.history.push("/500");
        });
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      charityService
      .getCharity(id)
      .then((result) => {
        this.setState({
          name: result.data.name,
          description: result.data.description,
          image: result.data.image,
        });
      });
    }
  }

  render() {
    const { name, description, image, imageIsUploading } = this.state;

    return (
      <Container align="justify">
      <Card style={{ paddingBottom: 60 }}>
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
            <h2>Charity Form</h2>
            <h3>Please enter your information</h3>
          </div>
          <form onSubmit={this.handleSubmit}>
            {image && <img src={image} alt={name} width="150px" />}
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
            {/* <input onChange={this.handleImageUpload} type="file" name="image" /> */}

            <TextField
              style={{ marginTop: 20 }}
              onChange={this.handleChange}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              value={name}
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
                Add this Charity!
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
          </form>

          {/* <p>Do you want to delete this charity?</p>
        <button type="submit" disabled={imageIsUploading}> Delete </button> */}
        </Box>
        </Card>
      </Container>   
    );
  }
}

export default CharityForm;
