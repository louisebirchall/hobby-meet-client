import React, { Component } from "react";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import charityService from "../../services/charity-service";

class CharityForm extends Component {
  state = {
    name: "",
    description: "",
    image: "",
    // post_id: ""
    // review_id: ""
  };

  handleChange = (event) => {
    // console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, description, image } =
      this.state;
    const { id } = this.props.match.params;

    if (this.props.isEdit) {
      charityService
        .edit(id, name, description, image)
        .then(() => {
          this.props.history.push("/"); // ! to where?
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    } else {
      charityService
        .create(name, description, image)
        .then(() => {
          this.props.history.push("/"); // ! or /charities?
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    }
  };

  handleImageUpload = (event) => {
    this.setState({ imageIsUploading: true });

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_SERVER_API}/upload`, uploadData)
      .then((result) => {
        this.setState({
          image: result.data.imagePath,
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
      charityService
        .getCharity(id)
        .then((result) => {
          this.setState({
            name: result.data.name,
            description: result.data.description,
            image: result.data.image,
          });
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    }
  }

  render() {
    const {
      name, description, image,
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
          <label htmlFor="description">Description </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="description"
            value={description}
          />
          <br />
          <div>
            {image && <img src="{image}" alt="" />}
            <PuffLoader
              loading={imageIsUploading}
              size="100px"
              color="orchid"
            />
            {/* // ! input still in div, right? */}
            <label htmlFor="Image">Representative image </label>
            <input
              onChange={this.handleImageUpload}
              type="file"
              name="image"
            />
          </div>
          <br />
          <button type="submit" disabled={imageIsUploading}>
            Add this Charity
          </button>
        </form>
      </div>
    );
  }
}

export default CharityForm;
