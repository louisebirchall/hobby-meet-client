import React, { Component } from "react";
import reviewService from "../services/review-service";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

class ReviewForm extends Component {
  state = {
    comment: "",
    likes: 0,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLikes = () => {
    const likeCount = this.state.likes + 1;
    this.setState({ likes: likeCount });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { comment, likes } = this.state;
    const { id } = this.props.match.params;

    reviewService
      .createReview(id, comment, likes)
      .then(() => {
        this.props.history.push("/events");
      })
      .catch((err) => {
        //this.props.history.push("/500");
      });
  };

  //   componentDidMount() {
  //     const { id } = this.props.match.params;
  //     if (id) {
  //       reviewService
  //         .getReview(id)
  //         .then((result) => {
  //           this.setState({
  //             comment: result.data.comment,
  //             likes: result.data.likes,
  //           });
  //         })
  //         .catch((err) => {
  //           this.props.history.push("/500");
  //         });
  //     }
  //   }

  render() {
    const { comment, likes } = this.state;
    // const { id } = this.params

    return (
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
        style={{ paddingBottom: 60 }}
      >
        <form onSubmit={this.handleSubmit}>
          <button onClick={this.handleLikes} id={this.props.id}>
            Likes: {likes}
          </button>

          <TextField
            onChange={this.handleChange}
            id="outlined-multiline-flexible"
            label="Your Review:"
            multiline
            maxRows={4}
            variant="outlined"
            name="comment"
            value={comment}
          />

          <button type="submit">Add your Review</button>
        </form>
      </Box>
    );
  }
}

export default ReviewForm;
