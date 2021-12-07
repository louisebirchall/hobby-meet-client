import React, { Component } from "react";
import { Link } from "react-router-dom";
import productService from "../../services/product-service";
import {
  Container,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  CardActions,
} from "@material-ui/core";
import Payment from "../Payment/Payment";
import { PuffLoader } from "react-spinners";

class ProductsPage extends Component {
  state = {
    listOfProducts: null,
    isLoading: true,
  };

  handleClick = (item) => {
    this.props.payForItem(item);
  };

  componentDidMount() {
    productService
      .getProducts()
      .then((response) => {
        this.setState({ listOfProducts: response.data, isLoading: false });
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  }

  render() {
    const { listOfProducts, isLoading, itemToBuy } = this.state;
    const { user } = this.props;

    return (
      <Container style={{ paddingBottom: 60 }}>
        <div align="center" style={{ marginBottom: 10 }}>
          <Typography variant="h2">All The Products</Typography>
        </div>
        <Grid
          container
          spacing={3}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {isLoading && <PuffLoader size="100px" color="orchid" />}

          {!isLoading &&
            listOfProducts.map((eachProduct) => {
              return (
                <Grid item key={eachProduct._id}>
                  <Card xs={12} md={6} lg={4}>
                    <CardMedia align="center">
                      {eachProduct.image && (
                        <img
                          src={eachProduct.image}
                          alt={eachProduct.title}
                          style={{ height: 200 }}
                        />
                      )}
                    </CardMedia>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        {eachProduct.title}
                      </Typography>
                      <Typography component="div" variant="p">
                        {eachProduct.price} €
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="outlined"
                        href={`/products/${eachProduct._id}`}
                      >
                        <Typography component="div" variant="h5">
                          details
                        </Typography>
                      </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => this.handleClick(eachProduct)}
                      >
                        <Typography component="div" variant="h5">
                          Buy it!
                        </Typography>
                      </Button>
                      {itemToBuy && itemToBuy._id === eachProduct._id && (
                        <Payment itemToBuy={itemToBuy} />
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
        {user && (
          <div align="center" style={{ marginTop: 10 }}>
            <Button
              style={{ marginTop: 20 }}
              color="secondary"
              variant="contained"
              component={Link}
              to="/products/create"
            >
              Add Product!
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default ProductsPage;
