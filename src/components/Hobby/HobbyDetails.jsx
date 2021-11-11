import React, { Component } from "react";
import { Link } from "react-router-dom";
import hobbyService from "../../services/hobby-service";

class HobbyDetails extends Component {
  state = {
    singleHobby: null,
    isLoading: true,
  };

  componentDidMount() {
    hobbyService.getHobby
      .then((response) => {
        // pretty sure this isn't right
        this.setState({ singleHobby: response.data, isLoading: false });
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  }

  handleDelete = () => {
    hobbyService.delete
      .then((data) => {
        this.props.history.push("/hobbies");
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  };

  render() {
    const { isLoading, singleHobby } = this.state;

    return (
      <div>
        <h2>{singleHobby.name}</h2>
        {isLoading && <h1>...Loading</h1>}

        {!isLoading && (
          <div>
            {singleHobby.hobbyImage && (
              <img src={singleHobby.hobbyImage} alt={singleHobby.name} />
            )}
            <p>Description: {singleHobby.description} </p>
            <p>Where: {singleHobby.placeOFActivity} </p>
            <p>Category: {singleHobby.typeOfActivity} </p>
            <Link to={`/hobbies/${singleHobby._id}/edit`}>
              <button>Edit</button>
            </Link>
            <button onClick={this.handleDelete}>Delete</button>
          </div>
        )}
      </div>
    );
  }
}

export default HobbyDetails;
