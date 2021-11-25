import React, { Component } from "react";
import { Link } from "react-router-dom";
import productService from "../../services/product-service";
import AddPostForm from "../AddPostForm";
// import EditPostForm from "../Posts/EditPostForm";
import reviewService from "../../services/review-service";
import ReviewForm from "../ReviewForm";
import { Button } from "@mui/material";


class ProductDetails extends Component {
  state = {
    singleProduct: null,
    isLoading: true,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    productService
    .getProduct(id)
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
        this.props.history.push("/products");
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
              <img src={singleProduct.image} alt={singleProduct.title} width="150px"/>
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

            <Button component={Link} to="/products/create">
              Create!
            </Button>
            
            <Link to={`/products/${singleProduct._id}/edit`}>
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