import React, { Component } from "react";
import charityService from "../../services/charity-service";
import generalService from "../../services/general-service";
import { PuffLoader } from "react-spinners";

class CharityForm extends Component {
  state = {
    name: "",
    description: "",
    image: "",
    imageIsUploading: false,
    // post_id: ""
    // review_id: ""
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
    // console.log(event.target);
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
        .then(() => {
          // see SignupComponent to compare: this.props.setUser
          this.props.history.push(`/charities/${id}`); // create or id of created oder list?
        })
        .catch((err) => {
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
        })
        // .catch((err) => {
        //   this.props.history.push("/500");
        // });
    }
  }

  render() {
    const { name, description, image, imageIsUploading } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            {image && <img src={image} alt="{name}" width="150px"/>}
            <PuffLoader loading={imageIsUploading} size="100px"color="orchid"/>
            <label htmlFor="Image">Representative image </label>
            <input onChange={this.handleImageUpload} type="file" name="image" />

          <label htmlFor="name">Name </label>
          <input onChange={this.handleChange} type="text" name="name" value={name}/>
          
          <label htmlFor="description">Description </label>
          <input onChange={this.handleChange} type="text" name="description" value={description} />
          
          <button type="submit" disabled={imageIsUploading}>
            Add this Charity!
          </button>          

          <button type="submit" disabled={imageIsUploading}>
           Save changes!
        </button>

        </form>

       

        <p>Do you want to delete this charity?</p>
        <button type="submit" disabled={imageIsUploading}> Delete </button>

      </div>
    );
  }
}

export default CharityForm;
