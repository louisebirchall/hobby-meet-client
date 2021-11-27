import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import hobbyService from "../../services/hobby-service";
import AddPostForm from "../AddPostForm";
// import EditPostForm from "../Posts/EditPostForm";
import DeleteIcon from '@mui/icons-material/Delete';

class HobbyDetails extends Component {
  state = {
    singleHobby: null,
    isLoading: true,
  };

  handleDelete = () => {
    const { id } = this.props.match.params;
    hobbyService
      .delete(id)
      .then((data) => {
        this.props.history.push("/hobbies");
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    hobbyService
      .getHobby(id)
      .then((response) => {
        this.setState({ singleHobby: response.data, isLoading: false });
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  }

  render() {
    const { isLoading, singleHobby } = this.state;
    const { id } = this.props.match.params;

    return (
      <div style={{ paddingBottom: 60 }}>
        {isLoading && <h1>...Loading</h1>}

        {!isLoading && (
          <div>
            <h2>{singleHobby.name}</h2>
            {singleHobby.image && (
              <img
                src={singleHobby.image}
                alt={singleHobby.name}
                width="150px"
              />
            )}
            <p>Description: {singleHobby.description} </p>
            <p>Where: {singleHobby.placeOfActivity} </p>
            <p>Category: {singleHobby.typeOfActivity} </p>

            <AddPostForm id={id} service={hobbyService} />

            {/* <EditPostForm id={id} service={charityService} /> */}

            {/* <Button component={Link} to="/hobbies/create">
              Create!
            </Button> */}

            <Button component={Link} to={`/hobbies/${singleHobby._id}/edit`}>
              Edit
            </Button>
            <Button color="secondary" variant="contained" startIcon={<DeleteIcon />} onClick={this.handleDelete}>Delete</Button>

            {/* <Button onClick={this.handleDelete}>Delete</Button> */}

            {/* <button onClick={this.handleDelete}>Delete</button> */}
          </div>
        )}
      </div>
    );
  }
}

export default HobbyDetails;
