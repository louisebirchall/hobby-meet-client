import React, { Component } from "react";
import { PuffLoader } from "react-spinners";
import imageService from "../../services/image-service";

// editing a post should only be possible for creator of it!

class EditPostForm extends Component {
  state = {
    // should it be empty or recalling the information of the existing post?
    // if !empty => how possible with hobby/event/charity?
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

  // for changing the image of the post -> do we want the users to change the image or just the "description?"
  handleImageUpload = (event) => {
    this.setState({ imageIsUploading: true });

    const formdata = new FormData();
    formdata.append("image", event.target.files[0]);

    imageService
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
      <div>
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
