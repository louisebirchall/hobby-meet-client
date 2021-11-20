import React, { Component } from "react";
import { Link } from "react-router-dom";
import hobbyService from "../../services/hobby-service";
import AddPostForm from "../AddPostForm";

class HobbyDetails extends Component {
  state = {
    singleHobby: null,
    isLoading: true,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    hobbyService
    .getHobby(id)
      .then((response) => {
        // pretty sure this isn't right
        this.setState({ singleHobby: response.data, isLoading: false });
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  }

  handleDelete = () => {
    hobbyService.delete()
      .then((data) => {
        this.props.history.push("/hobbies");
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  };

  render() {
    const { isLoading, singleHobby } = this.state;
    const { id } = this.props.match.params;

    return (
      <div>
        
        {isLoading && <h1>...Loading</h1>}

        {!isLoading && (
          <div>
          <h2>{singleHobby.name}</h2>
            {singleHobby.hobbyImage && (
              <img src={singleHobby.hobbyImage} alt={singleHobby.name} />
            )}
            <p>Description: {singleHobby.description} </p>
            <p>Where: {singleHobby.placeOfActivity} </p>
            <p>Category: {singleHobby.typeOfActivity} </p>
            <AddPostForm id={id} service={hobbyService} />
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
