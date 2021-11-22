import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import charityService from "../../services/charity-service";
import AddPostForm from "../AddPostForm";
import EditPostForm from "../Posts/EditPostForm";
import reviewService from "../../services/review-service";
import ReviewForm from "../ReviewForm";


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
    const { id } = this.props.match.params;
    charityService
    .delete(id)
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
            <hr />
            {/* here we need to add  */}

            <AddPostForm id={id} service={charityService} />
            <hr />
            <ReviewForm id={id} service={reviewService} />
            {/* this should only be displayed for the creator of the post.
            is related to the specific id of the original post? */}
            {/* <EditPostForm id={id} service={charityService} /> */}

            <br />

            {/* <p>Add your post here: {singleCharity.postService} </p> */}

            {/* form for posts then
             form for reviews */}
            <Link to={`/charities/${singleCharity._id}/edit`}>
              <button>Edit</button>
            </Link>

            <Link to={"/charities/create"}>
              <button>Create</button>
            </Link>

            <button onClick={this.handleDelete}>Delete</button>
          </div>
        )}
      </div>
    );
  }
}

export default CharityDetails;
