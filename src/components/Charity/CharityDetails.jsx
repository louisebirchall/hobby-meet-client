import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import charityService from "../../services/charity-service";
import AddPostForm from "../AddPostForm";
import EditPostForm from "../Posts/EditPostForm";
import reviewService from "../../services/review-service";
import ReviewForm from "../ReviewForm";
import {
  Box,
  Container,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";

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

  handleNewData = (data) => {
    this.setState({ singleCharity: data.charity });
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
      <Container style={{ paddingBottom: 60 }}>
        <Card sx={{ display: "flex" }}>
          {isLoading && <h1>...Loading</h1>}
          {!isLoading && (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                {singleCharity.image && (
                  <CardMedia
                  component="img"
                    image={singleCharity.image}
                    alt={singleCharity.name}
                    width="150px"
                  />
                )}

                <Typography component="div" variant="h3">
                  {singleCharity.name}
                </Typography>
                <Typography variant="p" color="text.secondary" component="div">
                  Description: {singleCharity.description}{" "}
                </Typography>

                {/* <Button component={Link} to="/charities/create">
                  Create{" "}
                </Button> */}
                <Button
                color="primary" variant="contained"
                  component={Link}
                  to={`/charities/${singleCharity._id}/edit`}
                >
                  {" "}
                  Edit{" "}
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={this.handleDelete}
                >
                  Delete
                </Button>
              </CardContent>
            </Box>
          )}
        </Card>
        <AddPostForm id={id} service={charityService}  saveUpdatedData={this.handleNewData}
        />
        {singleCharity &&
          singleCharity.posts.map((post) => <p>{post.description}</p>)}
        <ReviewForm id={id} service={reviewService} />
      </Container>
    );
  }
}

export default CharityDetails;
