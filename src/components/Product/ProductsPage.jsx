import React, { Component } from "react";
import { Link } from "react-router-dom";
import productService from "../../services/product-service";
import {Container, Button, Card, CardMedia, CardContent, Typography, Grid, CardActions} from '@material-ui/core'
import Payment from "../Payment/Payment"



class ProductsPage extends Component {
  state = {
    listOfProducts: null,
    isLoading: true,
    itemToBuy: null,
  };

   handleClick = (item) => {
    this.setState({itemToBuy: item})
  }

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
                    <CardMedia>
                      {eachProduct.image && (<img src={eachProduct.image}  alt={eachProduct.title} /> )}
                    </CardMedia>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h5">{eachProduct.title}</Typography>
                      <Typography  component="div" variant="p">{eachProduct.price} €</Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={() => this.handleClick(eachProduct)} href={'/products/payments/create-payment-intent'}>Buy it!</Button>
                      {itemToBuy && itemToBuy._id === eachProduct._id && <Payment itemToBuy={itemToBuy}/>}

                      <Button href={`/products/${eachProduct._id}`}>See details!</Button>
                    </CardActions>
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