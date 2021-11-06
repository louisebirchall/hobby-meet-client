import React, { Component } from "react";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import hobbyService from "../../services/hobby-service";

class HobbyForm extends Component {
  state = {
    name: "",
    typeOfActivity: "",
    description: "",
    hobbyImage: "",
    imageIsUploading: false,
    placeOfActivity: "",
    // post_id: ""
  };

  handleChange = (event) => {
    // console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, typeOfActivity, description, hobbyImage, placeOfActivity } =
      this.state;
    const { id } = this.props.match.params;

    if (this.props.isEdit) {
      hobbyService
        .edit(
          id,
          name,
          typeOfActivity,
          description,
          hobbyImage,
          placeOfActivity
        )
        .then(() => {
          this.props.history.push("/"); // ! to hobbies/:id/details
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    } else {
      hobbyService
        .create(name, typeOfActivity, description, hobbyImage, placeOfActivity)
        .then(() => {
          this.props.history.push("/"); // ! or /hobbies?
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    }
  };

  handleImageUpload = (event) => {
    this.setState({ imageIsUploading: true });

    const uploadData = new FormData();
    uploadData.append("hobbyImage", event.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_SERVER_API}/hobby-meet/upload`, uploadData)
      .then((result) => {
        this.setState({
          hobbyImage: result.data.imagePath,
          imageIsUploading: false,
        }); // ! what's imagePath? don't remember
      })
      .catch(() => {
        this.props.history.push("/500");
      });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      hobbyService
        .getHobby(id)
        .then((result) => {
          this.setState({
            name: result.data.name,
            typeOfActivity: result.data.typeOfActivity,
            description: result.data.description,
            hobbyImage: result.data.hobbyImage,
            placeOfActivity: result.data.placeOfActivity,
          });
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    }
  }

  render() {
    const {
      name,
      typeOfActivity,
      description,
      hobbyImage,
      placeOfActivity,
      imageIsUploading,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="name"
            value={name}
          />
          <br />
          <label htmlFor="typeOfActivity">Type of Activity </label>
          <input
            onChange={this.handleChange}
            type="text" // ! what type as it's an option?
            name="typeOfActivity"
            value={typeOfActivity}
          />
          <br />
          <label htmlFor="description">Description </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="description"
            value={description}
          />
          <br />
          <div>
            {hobbyImage && <img src="{hobbyImage}" alt="Hobby image upload" />}
            <PuffLoader
              loading={imageIsUploading}
              size="100px"
              color="orchid"
            />
            {/* // ! input still in div, right? */}
            <label htmlFor="hobbyImage">Representative image </label>
            <input
              onChange={this.handleImageUpload}
              type="file"
              name="hobby image"
            />
          </div>

          <br />
          <label htmlFor="placeOfActivity">Where do we do this hobby? </label>
          <input
            onChange={this.handleChange}
            type="text" // ! what type is it?
            name="placeOfActivity"
            value={placeOfActivity}
          />
          <br />
          <button type="submit" disabled={imageIsUploading}>
            Add this hobby
          </button>
        </form>
      </div>
    );
  }
}

export default HobbyForm;
