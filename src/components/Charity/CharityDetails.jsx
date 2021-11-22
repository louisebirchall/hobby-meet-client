import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import charityService from "../../services/charity-service";
import AddPostForm from "../AddPostForm";
import EditPostForm from "../Posts/EditPostForm";
import reviewService from "../../services/review-service";
import ReviewForm from "../ReviewForm";
import {Container, Button, Card, CardActions, CardContent, CardMedia, Typography} from '@material-ui/core'



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
      <Container>
        {isLoading && <h1>...Loading</h1>}

        {!isLoading && (
          <Card sx={{ maxWidth: 345 }}>
              <h2>{singleCharity.name}</h2>

              <CardMedia>
                {singleCharity.image && (
                  <img src={singleCharity.image} alt={singleCharity.name} />
                )}
              </CardMedia>

              <Typography>Description: {singleCharity.description} </Typography>
        
              <CardActions>
                <Button component={Link} to={`/charities/${singleCharity._id}/edit`}>
                  Edit
                </Button>
                
                <Button onClick={this.handleDelete}>Delete</Button>
              </CardActions>
          </Card>    
              )}
       
            <AddPostForm id={id} service={charityService} />
            {/* <EditPostForm id={id} service={charityService} /> */}

            <ReviewForm id={id} service={reviewService} />

      </Container>
    );
  }
}

export default CharityDetails;
