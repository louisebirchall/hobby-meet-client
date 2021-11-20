import React, { Component } from "react";
import { PuffLoader } from "react-spinners";
import productService from "../../services/product-service";
import imageService from "../../services/image-service";

// so it's almost the same like adding a product
// content needs to be prefilled and changed with the form below?
// should only be possible for creator + admin


class EditProductForm extends Component {
  state = {
    image: "",
    title: "",
    description: "",
    pricePolicy: "",
    price: "",
    event_id: "",
    user_id: "",
    charity_id: "",
  };

  handleChange = (event) => {
    // console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      image,
      title,
      description,
      pricePolicy,
      price,
      event_id,
      user_id,
      charity_id,
    } = this.state;
    const { id } = this.props.match.params;

    if (this.props.isEdit) {
      productService
        .edit(
          id,
          image,
          title,
          description,
          pricePolicy,
          price,
          event_id,
          user_id,
          charity_id
        )
        .then(() => {
          this.props.history.push("/products/_id"); // ! to events/:id/details
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    } else {
      productService
        .create(
          id,
          image,
          title,
          description,
          pricePolicy,
          price,
          event_id,
          user_id,
          charity_id
        )
        .then(() => {
          this.props.history.push("/products"); // ! or /events?
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

    imageService
      .upload(uploadData)
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
      productService
        .getProduct(id)
        .then((result) => {
          this.setState({
            image: result.data.image,
            title: result.data.title,
            description: result.data.description,
            user_id: result.data.user_id,
            pricePolicy: result.data.pricePolicy,
            price: result.data.price,
            event_id: result.data.event_id,
            charity_id: result.data.charity_id,
          });
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    }
  }

  render() {
    const {
      image,
      title,
      description,
      pricePolicy,
      price,
      event_id,
      user_id,
      charity_id,
      imageIsUploading,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Product title </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="title"
            value={title} // ! sat 6 got this far
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
            {image && <img src="{image}" alt=" " />}
            <PuffLoader
              loading={imageIsUploading}
              size="100px"
              color="orchid"
            />
            {/* // ! input still in div, right? */}
            <label htmlFor="image">Representative image </label>
            <input
              onChange={this.handleImageUpload}
              type="file"
              name="product image"
            />
          </div>
          <br />
          <label htmlFor="pricePolicy">Price Policy</label>
          <input
            onChange={this.handleChange}
            type="text" // ! what type is it?
            name="pricePolicy"
            value={pricePolicy}
          />
          <br />
          <label htmlFor="price">Price </label>
          <input
            onChange={this.handleChange}
            type="number"
            name="price"
            value={price}
          />
          <br />
          <label htmlFor="event_id">Where was it created? </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="event_id"
            value={event_id}
          />
          <br />
          <label htmlFor="user_id">Who was the creator? </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="user_id"
            value={user_id}
          />
          <br />
          <label htmlFor="charity_id">Which charity is it for? </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="charity_id"
            value={charity_id}
          />
          <br />
          <label htmlFor="pricePolicy">Price Policy </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="pricePolicy"
            value={pricePolicy}
          />
          <br />
          <label htmlFor="price">Price </label>
          <input
            onChange={this.handleChange}
            type="number"
            name="price"
            value={price}
          />
          <br />
          <button type="submit" disabled={imageIsUploading}>
            Add this product!
          </button>
        </form>
      </div>
    );
  }
}

export default EditProductForm;
