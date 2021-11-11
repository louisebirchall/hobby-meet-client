import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class CharitiesPage extends Component {
  state = {
    listOfCharities: null,
    isLoading: true,
  };

  componentDidMount() {
    console.log(process.env.REACT_APP_SERVER_API);
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/charities`)
      .then((response) => {
        this.setState({ listOfCharities: response.data, isLoading: false });
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  }

  render() {
    const { listOfCharities, isLoading } = this.state;

    return (
      <div>
        <h1>All The Charities</h1>

        {isLoading && <h1>...isLoading</h1>}

        {!isLoading &&
          listOfCharities.map((eachCharity) => {
            return (
              <div key={eachCharity._id}>
                <Link to={`/charities/${eachCharity._id}`}>
                  {eachCharity.title}
                </Link>
              </div>
            );
          })}
      </div>
    );
  }
}

export default CharitiesPage;