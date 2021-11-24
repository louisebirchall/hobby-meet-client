import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import charityService from "../../services/charity-service";
import AddPostForm from "../AddPostForm";
import EditPostForm from "../Posts/EditPostForm";
import reviewService from "../../services/review-service";
import ReviewForm from "../ReviewForm";
import { Container, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";

class CharityDetails extends Component {
  state = {
    singleCharity: null,
    isLoading: true,
  };

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

  render() {
    const { isLoading, singleCharity } = this.state;
    const { id } = this.props.match.params;

    return (
      <Container>
        {isLoading && <h1>...Loading</h1>}
        {!isLoading && (
          <div
            style={{
              maxWidth: "50%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <CardMedia>
              {singleCharity.image && (
                <img
                  src={singleCharity.image}
                  alt={singleCharity.name}
                  width="150px"
                />
              )}
            </CardMedia>
            <div>
              <h2>{singleCharity.name}</h2>
              <Typography>Description: {singleCharity.description} </Typography>
              <CardActions>
                <Button component={Link} to="/charities/create">
                  Create!
                </Button>
                <Button
                  component={Link}
                  to={`/charities/${singleCharity._id}/edit`}
                >
                  Edit
                </Button>
                <Button onClick={this.handleDelete}>Delete</Button>
              </CardActions>
            </div>
          </div>
        )}
        <AddPostForm id={id} service={charityService} />
        {/* <EditPostForm id={id} service={charityService} /> */}
        <ReviewForm id={id} service={reviewService} />
      </Container>
    );
  }
}

export default CharityDetails;
