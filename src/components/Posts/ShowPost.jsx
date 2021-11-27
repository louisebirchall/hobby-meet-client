import React, { Component } from "react";
import { PuffLoader } from "react-spinners";
import postService from "../../services/post-service";
import {Container, Button, Card, CardMedia, Typography, Grid, CardContent, CardActions} from '@material-ui/core'

// editing a post should only be possible for creator of it!

class ShowPost extends Component {
  state = {
    listOfPosts: "",
    isLoading: true,
  };

  componentDidMount() {
    postService
    .getPosts()
      .then((response) => {
        this.setState({ singlePost: response.data, isLoading: false });
      })
      .catch((err) => {
       // this.props.history.push("/500");
      });
  }


  render() {
    const { listOfPosts, isLoading } = this.state;

    return (
        <Container style={{ paddingBottom: 60 }}>
            <Typography variant="h2">All The Events</Typography>
            <Grid container spacing={3}>
                {isLoading && <h1>...isLoading</h1>}
                {!isLoading &&
                    listOfPosts.map((eachPost) => {
                        return (
                            <Grid item key={eachPost._id}>
                            <Typography component="div" variant="h5">{eachPost.description}</Typography>
                            </Grid>
                        );
                        })}
             </Grid>
      </Container>
    );
  }
}

export default ShowPost;
