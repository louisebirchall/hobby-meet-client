import React, { Component } from "react";
import { PuffLoader } from "react-spinners";
import generalService from "../../services/general-service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Input } from "@material-ui/core";

class AddPostForm extends Component {
  state = {
    image: "",
    description: "",
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

  handleSubmit = (event) => {
    event.preventDefault();
    const { image, description } = this.state;
    const { id } = this.props;

    this.props.service
      .createPost(id, description, image)
      .then((response) => {
        console.log(response);
        this.props.saveUpdatedData(response.data);
      })
      .catch((err) => {
        //console.log(err)
        //this.props.history.push("/500");
      });
  };

  handleChange = (event) => {
    // console.log(event.target)
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { image, description, imageIsUploading } = this.state;

    return (
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        style={{ paddingBottom: 60 }}
        noValidate
        autoComplete="off"
      >
        <form onSubmit={this.handleSubmit}>
          {/* {image && <img src={image} alt="postImg" width="150px" />}
          <PuffLoader loading={imageIsUploading} size="100px" color="orchid" />
          <label htmlFor="contained-button-file" >
          <Input
            onChange={this.handleImageUpload}
            accept="image/*"
            type="file"
          />
          </label> */}

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

          <Button type="submit" disabled={imageIsUploading}>
            Post!
          </Button>
        </form>
      </Box>
    );
  }
}

export default AddPostForm;
