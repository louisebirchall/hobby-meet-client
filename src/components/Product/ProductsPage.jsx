import React, { Component } from "react";
import { Link } from "react-router-dom";
import productService from "../../services/product-service";
import {Container, Button, Card, CardMedia, Typography, Grid} from '@material-ui/core'


class ProductsPage extends Component {
  state = {
    listOfProducts: null,
    isLoading: true,
  };

  componentDidMount() {
    // console.log(process.env.REACT_APP_SERVER_API);
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
    const { listOfProducts, isLoading } = this.state;

    return (
      <Container style={{ paddingBottom: 60 }}>
        <Typography variant="h2">All The Products</Typography>
        <Grid container spacing={3}>
          {isLoading && <h1>...isLoading</h1>}

          {!isLoading &&
            listOfProducts.map((eachProduct) => {
              return (
                <Grid item key={eachProduct._id}>
                  <Card xs={12} md={6} lg={4}>
                    <Typography variant="h4">{eachProduct.title}</Typography>

                    <CardMedia>
                      {eachProduct.image && (
                        <img
                          src={eachProduct.image}
                          alt={eachProduct.title}
                          width="150px"
                        />
                      )}
                    </CardMedia>

                    <Button href="#text-buttons">
                      <Link to={`/products/${eachProduct._id}`}>
                        {eachProduct.title}
                      </Link>
                    </Button>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    );
  }
}

export default ProductsPage;