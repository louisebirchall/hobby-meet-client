import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom"

class HobbyDetails extends Component {
  state = {
    singleHobby: null,
    isLoading: true,
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/hobby-meet/${this.props.match.params.id}`
      )
      .then((response) => {
        this.setState({ singleHobby: response.data, isLoading: false });
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  }

  handleDelete = () => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_API}/hobby-meet/${this.props.match.params.id}`
      )
      .then((data) => {
        this.props.history.push("/");
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
            {singleHobby.hobbyImage && <img src={singleHobby.hobbyImage} />}
            {/* alt=`${singleHobby.name}` */}
            <p>Description: {singleHobby.description} </p>
            <p>Where: {singleHobby.placeOFActivity} </p>
            <p>Category: {singleHobby.typeOfActivity} </p>
            <Link to={`/todo/${singleHobby._id}/edit`}>
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
