import React, { Component } from "react";
import { Link } from "react-router-dom";
import productService from "../../services/product-service";
import {Container, Button, Card, CardMedia, CardContent, Typography, Grid} from '@material-ui/core'
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
      <Container>
        <Typography variant="h2">All The Products</Typography>
        <Grid container spacing={3}>
          {isLoading && <h1>...isLoading</h1>}

          {!isLoading &&
            listOfProducts.map((eachProduct) => {
              return (
                <Grid item  key={eachProduct._id}>
                  <Card xs={12} md={6} lg={4}>
                    <CardMedia>
                    {eachProduct.image && (<img src={eachProduct.image} alt={eachProduct.title} width="150px"/> )}
                    </CardMedia>
                    <CardContent>
                      <Typography variant="h4">{eachProduct.title}</Typography>

                      <Typography variant="p">{eachProduct.price} €</Typography>

                      <Button onClick={() => this.handleClick(eachProduct)} href={'products/payments/create-payment-intent'}>Buy it!</Button>
                       {itemToBuy && itemToBuy._id === eachProduct._id && <Payment itemToBuy={itemToBuy}/>}

                      <Button href={`/products/${eachProduct._id}`}>See details!</Button>
                    </CardContent>
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