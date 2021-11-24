import React, { Component } from 'react'
import { PuffLoader } from "react-spinners";
import generalService from "../services/general-service";
import postService from "../services/post-service";
// import charityService from "../services/charity-service";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

class AddPostForm extends Component {
  state = {
    image: "",
    description: "",
    imageIsUploading: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { image, description } = this.state;
    const { id } = this.props;

    postService
      .createPost(id, description, image)
      .then(() => {
        //this.props.history.push("/posts");
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

  handleImageUpload = (event) => {
    this.setState({ imageIsUploading: true });

    const formdata = new FormData();
    formdata.append("image", event.target.files[0]);

    generalService
      .upload(formdata)
      .then((result) => {
        this.setState({
          image: result.data.imagePath,
          imageIsUploading: false,
        });
      })
      .catch(() => this.props.history.push("/500"));
  };

  render() {
    const { image, description, imageIsUploading } = this.state;

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
          {image && <img src={image} alt="postImg" width="150px" />}
          <PuffLoader loading={imageIsUploading} size="100px" color="orchid" />
          <input onChange={this.handleImageUpload} type="file" name="image" />

          <label htmlFor="description">Description</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="description"
            value={description}
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

          <button type="submit" disabled={imageIsUploading}>
            Post!
          </button>
        </form>
        </Box>
    );
  }
}

export default AddPostForm;
