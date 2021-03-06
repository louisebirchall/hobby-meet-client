import React, { Component } from "react";
import { PuffLoader } from "react-spinners";
import generalService from "../../services/general-service";

// editing a post should only be possible for creator of it!

class EditPostForm extends Component {
  state = {
    image: "",
    description: "",
    imageIsUploading: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { image, description } = this.state;
    const { id } = this.props;

    this.props.service
      .editPost(id, description, image)
      .then(() => {
        // back to page with related post that got changed
        //this.props.history.push("/posts/:id");
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  };

  handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
  };

  // for changing the image of the post
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
      <div style={{ paddingBottom: 60 }}>
        <form onSubmit={this.handleSubmit}>
          {image && <img src={image} alt="postImage" />}
          <PuffLoader loading={imageIsUploading} size="100px" color="orchid" />
          <input onChange={this.handleImageUpload} type="file" name="image" />

          <label htmlFor="description">Description</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="description"
            value={description}
          />

          <button type="submit" disabled={imageIsUploading}>
            Change Post!
          </button>
        </form>
      </div>
    );
  }
}

export default EditPostForm;
