import React, { Component } from "react";
import { Link as RouterLink} from "react-router-dom";
import productService from "../../services/product-service";
import AddPostForm from "../Posts/AddPostForm";
// import EditPostForm from "../Posts/EditPostForm";
import reviewService from "../../services/review-service";
import ReviewForm from "../ReviewForm";
import {
  Container,
  Button,
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Grid,
  Link
} from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { PuffLoader } from "react-spinners";

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

  handleNewData = (data) => {
    this.setState({ singleProduct: data.product });
  };

  render() {
    const { isLoading, singleProduct } = this.state;
    const { id } = this.props.match.params;
    const { user } = this.props;
    const isOwner = user?._id === singleProduct?.user_id?._id;

    return (
      <Container
        style={{
          paddingBottom: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card sx={{ display: "flex" }}>
          {isLoading && <PuffLoader size="100px" color="orchid" />}

          {!isLoading && (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                {singleProduct.image && (
                  <CardMedia
                    component="img"
                    image={singleProduct.image}
                    alt={singleProduct.title}
                    style={{ width: 300 }}
                  />
                )}
                <Typography component="div" variant="h3">
                  {singleProduct.title}
                </Typography>
                <Typography variant="p" color="text.secondary" component="div">
                  Description: {singleProduct.description}{" "}
                </Typography>
                <Typography variant="p" color="text.secondary" component="div">
                  Price Policy: {singleProduct.pricePolicy}
                </Typography>
                <Typography variant="p" color="text.secondary" component="div">
                  Price: {singleProduct.price}
                </Typography>
                {/* <Typography variant="p" color="text.secondary" component="div">
                  Donations for: {singleProduct.charity_id}
                </Typography> */}
                {/* <Typography variant="p" color="text.secondary" component="div">Made in the event: {singleProduct.event_id}</Typography> */}

                <Typography variant="p" color="text.secondary" component="div">
                  <Link
                    component={RouterLink}
                    to={`/users/${singleProduct.user_id._id}`}
                  >
                    Created by: {singleProduct.user_id.username}
                  </Link>
                </Typography>

                {isOwner && (
                  <Grid
                    container
                    spacing={3}
                    style={{
                      marginTop: 10,
                      // width: "50vw",
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    {/* <Button
                      color="primary"
                      variant="contained"
                      component={RouterLink}
                      to={`/products/${singleProduct._id}/edit`}
                    >
                      Edit
                    </Button> */}

                    <Button
                      color="secondary"
                      variant="contained"
                      component={RouterLink}
                      to={`/products/${singleProduct._id}/edit`}
                    >
                      Edit
                    </Button>

                    <Button
                      color="secondary"
                      variant="contained"
                      component={RouterLink}
                      startIcon={<DeleteIcon />}
                      onClick={this.handleDelete}
                    >
                      Delete
                    </Button>
                  </Grid>
                )}
              </CardContent>
            </Box>
          )}
        </Card>
        {/*   <AddPostForm id={id} service={productService}  saveUpdatedData={this.handleNewData}
          <AddPostForm id={id} service={productService}  saveUpdatedData={this.handleNewData}
        />
        {singleProduct &&
          singleProduct.posts.map((post) => 
          <>
            <p>{post.description}</p>
            <image src={post.image}/>
           </>      
          )} */}
        {/* <ReviewForm id={id} service={reviewService} /> */}
      </Container>
    );
  }
}

export default ProductDetails;
