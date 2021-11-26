import React, { Component } from "react";
import { Link } from "react-router-dom";
import productService from "../../services/product-service";
import AddPostForm from "../AddPostForm";
// import EditPostForm from "../Posts/EditPostForm";
import reviewService from "../../services/review-service";
import ReviewForm from "../ReviewForm";
//import Payment from "../Payment/Payment"
import { Container, Button, Card, CardMedia, CardContent, Box, Typography } from "@material-ui/core";


class ProductDetails extends Component {
  state = {
    singleProduct: null,
    isLoading: true,
//    itemToBuy: null,
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

  /*   handleClick = (item) => {
    this.setState({itemToBuy: item})
  } */

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
      <Container style={{ paddingBottom: 60 }}>
          <Card sx={{ display: "flex" }}>
        {isLoading && <h1>...Loading</h1>}

        {!isLoading && (            
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
              {singleProduct.image && (
                <CardMedia
                  image={singleProduct.image}
                  alt={singleProduct.title}
                  width="150px"
                />
              )}
                <Typography component="div" variant="h3">{singleProduct.title}</Typography>
                <Typography variant="p" color="text.secondary" component="div">Description: {singleProduct.description} </Typography>
                <Typography variant="p" color="text.secondary" component="div">Price Policy: {singleProduct.pricePolicy}</Typography>
                <Typography variant="p" color="text.secondary" component="div">Price: {singleProduct.price}</Typography>
                <Typography variant="p" color="text.secondary" component="div">Donations for: {singleProduct.charity_id}</Typography>
                <Typography variant="p" color="text.secondary" component="div">Made in the event: {singleProduct.event_id}</Typography>
                <Typography variant="p" color="text.secondary" component="div">Created by: {singleProduct.username}</Typography>

                
                <Button component={Link} to={`/products/${singleProduct._id}/edit`}> Edit </Button>
                <Button onClick={this.handleDelete}>Delete</Button>
              </CardContent>
              </Box> 
              )}   
          </Card>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <AddPostForm id={id} service={productService} />

                {/* <EditPostForm id={id} service={charityService} /> */}

                <ReviewForm id={id} service={reviewService} />
              </Box>
        
      </Container>
    );
  }
}

export default ProductDetails;