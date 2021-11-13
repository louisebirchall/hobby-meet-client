import React, { Component } from "react";
import { Link } from "react-router-dom";
import charityService from "../../services/charity-service";
import Post from "../AddPostForm";

class CharityDetails extends Component {
  state = {
    singleCharity: null,
    isLoading: true,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    charityService
      .getCharity(id)
      .then((response) => {
        this.setState({ singleCharity: response.data, isLoading: false });
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  }

  handleDelete = () => {
    charityService.delete
      .then((data) => {
        this.props.history.push("/charities");
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  };

  render() {
    const { isLoading, singleCharity } = this.state;
    const { id } = this.props.match.params;

    return (
      <div>
        {isLoading && <h1>...Loading</h1>}

        {!isLoading && (
          <div>
            <h2>{singleCharity.name}</h2>
            {singleCharity.image && (
              <img src={singleCharity.image} alt={singleCharity.name} />
            )}
            <p>Description: {singleCharity.description} </p>
            {/* here we need to add  */}
            <Post id={id} service={charityService} />

            {/* <p>Add your post here: {singleCharity.postService} </p> */}

            {/* form for posts then
             form for reviews */}
            <Link to={`/charities/${singleCharity._id}/edit`}>
              <button>Edit</button>
            </Link>
            <button onClick={this.handleDelete}>Delete</button>
          </div>
        )}
      </div>
    );
  }
}

export default CharityDetails;
