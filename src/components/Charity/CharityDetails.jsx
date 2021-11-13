import React, { Component } from "react";
import { Link } from "react-router-dom";
import charityService from "../../services/charity-service";

class CharityDetails extends Component {
  state = {
    singleCharity: null,
    isLoading: true,
  };

  componentDidMount() {
    charityService.getCharity
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

    return (
      <div>
        <h2>{singleCharity.name}</h2>
        {isLoading && <h1>...Loading</h1>}

        {!isLoading && (
          <div>
            {singleCharity.image && (
              <img src={singleCharity.image} alt={singleCharity.name} />
            )}
            <p>Description: {singleCharity.description} </p>

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
