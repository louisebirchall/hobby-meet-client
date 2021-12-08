import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import charityService from "../../services/charity-service";
import AddPostForm from "../Posts/AddPostForm";
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
  Grid
} from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { PuffLoader } from "react-spinners";

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

  handleNewReview = (data) => {
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
    const { user } = this.props;
    const isOwner = user?._id === singleCharity?.user_id?._id;

    return (
      <Container style={{ paddingBottom: 60 }}>
        <Card sx={{ display: "flex" }}>
          {isLoading && <PuffLoader size="100px" color="orchid" />}

          {!isLoading && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                {singleCharity.image && (
                  <CardMedia
                    component="img"
                    image={singleCharity.image}
                    alt={singleCharity.name}
                    style={{ width: 300 }}
                  />
                )}

                <Typography component="div" variant="h3">
                  {singleCharity.name}
                </Typography>
                <Typography variant="p" color="text.secondary" component="div">
                  Description: {singleCharity.description}
                </Typography>

                {user && user.isAdmin && (
                  <Grid container spacing={3}>
                    <Button
                      color="primary"
                      variant="contained"
                      component={Link}
                      // onClick={this.}
                      to={`/charities/${singleCharity._id}/edit`}
                    >
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      onClick={this.handleDelete}
                    >
                      Delete
                    </Button>
                  </Grid>
                )}
              </CardContent>
            </Box>
          )}
        </Card>
        <AddPostForm
          id={id}
          service={charityService}
          saveUpdatedData={this.handleNewData}
        />
        {singleCharity &&
          singleCharity.posts.map((post) => <p>{post.image}<span>{post.description}</span></p>)}

        <ReviewForm
          id={id}
          service={reviewService}
          saveUpdatedData={this.handleNewReview}
        />
        {singleCharity &&
          singleCharity.reviews.map((reviews) => <p>{reviews.comment}</p>)}
      </Container>
    );
  }
}

export default CharityDetails;
