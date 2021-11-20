import React, { Component } from "react";
import { Link } from "react-router-dom";
import productService from "../../services/product-service";

class ProductsPage extends Component {
  state = {
    listOfEvents: null,
    isLoading: true,
  };

  componentDidMount() {
    // console.log(process.env.REACT_APP_SERVER_API);
    productService.getEvents()
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
      <div>
        <h1>All The Products</h1>

        {isLoading && <h1>...isLoading</h1>}

        {!isLoading &&
          listOfProducts.map((eachProduct) => {
            return (
              <div key={eachProduct._id}>
              <img src={eachProduct.image} alt={eachProduct.title}/>
                <Link to={`/events/${eachProduct._id}`}>{eachProduct.title}</Link>
              </div>
            );
          })}
      </div>
    );
  }
}

export default ProductsPage;