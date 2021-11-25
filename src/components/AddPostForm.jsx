// import postService from "../services/post-service";
import { Component } from "react";
import { PuffLoader } from "react-spinners";
import generalService from "../services/general-service";
// import charityService from "../services/charity-service";

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

    this.props.service
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

  // handleLikes = (btn) => {
  //   console.log("Liking/Disliking!");

  //   //this.setState({likes: this.state.number + 1 ? btn === "increase" : btn === "decrease"})

  //   if (btn === "increaseLikes") {
  //     this.setState({ likes: this.state.number + 1 });
  //   } else this.setState({ dislikes: this.state.number + 1 });
  // };

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

          <button type="submit" disabled={imageIsUploading}>
            Post!
          </button>
        </form>
      </div>
    );
  }
}

export default AddPostForm;
