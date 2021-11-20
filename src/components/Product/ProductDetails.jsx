import React, { Component } from "react";
import { Link } from "react-router-dom";
import productService from "../../services/product-service";
import AddPostForm from "../AddPostForm";
import reviewService from "../../services/review-service";
// import EditPostForm from "../Posts/EditPostForm";
import ReviewForm from "../ReviewForm";


class ProductDetails extends Component {
  state = {
    singleEvent: null,
    isLoading: true,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    productService
    .getEvent(id)
      .then((response) => {
        this.setState({ singleProduct: response.data, isLoading: false });
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  }

  handleDelete = () => {
    const { id } = this.props.match.params;
    productService
    .delete(id)
      .then((data) => {
        this.props.history.push("/");
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  };

  render() {
    const { isLoading, singleProduct } = this.state;
    const { id } = this.props.match.params;

    return (
      <div>
        
        {isLoading && <h1>...Loading</h1>}

        {!isLoading && (
          <div>
          <h2>{singleProduct.title}</h2>
            {singleProduct.image && (
              <img src={singleProduct.image} alt="" />
            )}
            <p>Description: {singleProduct.description} </p>
            <p>Where: {singleProduct.location} </p>
            <p>Price Policy:{singleProduct.pricePolicy}</p>
            <p>Price: {singleProduct.price}</p>
            <p>Donations for: {singleProduct.charity_id}</p>
            <p>Made in the event: {singleProduct.event_id}</p>
            <p>Created by: {singleProduct.user_id}</p>

            <AddPostForm id={id} service={productService} />

            {/* <EditPostForm id={id} service={charityService} /> */}

            <br/>
            <ReviewForm id={id} service={reviewService} />

            {/* 
            form for posts if wanted
            <div>
            <h2>Add a new post</h2>

                <form action="/posts/add" method="POST">
                  <label for="title">Comment</label>
                  <input type="text" name="title" />
                  <br />
                  <label for="description">Description</label>
                  <br />
                  <textarea name="description" id="" cols="30" rows="10"></textarea>
                  <br />

                  <label for="creator">Who are you?</label>
                  <select name="creator" id="">
                  </select>

                  <button type="submit">Add your knee-jerk opinions!</button>
                </form>
              </div> */}
            <Link to={`/events/${singleProduct._id}/edit`}>
              <button>Edit</button>
            </Link>
            <button onClick={this.handleDelete}>Delete</button>
          </div>
        )}
      </div>
    );
  }
}

export default ProductDetails;