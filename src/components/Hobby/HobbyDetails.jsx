import React, { Component } from "react";
import { Link } from "react-router-dom";
import hobbyService from "../../services/hobby-service";
import AddPostForm from "../AddPostForm";
import { Container, Button, Card, CardContent, CardMedia, Typography, Box } from "@material-ui/core";

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
      <Container  style={{ paddingBottom: 60 }}>
        <Card sx={{ display: "flex" }}>
          {isLoading && <h1>...Loading</h1>}
          {!isLoading && (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                {singleHobby.image && (
                  <CardMedia
                    src={singleHobby.image}
                    alt={singleHobby.name}
                    width="150px"
                  />
                )}
                <Typography component="div" variant="h3">{singleHobby.name}</Typography>
                <Typography variant="p" color="text.secondary" component="div">Description: {singleHobby.description} </Typography>
                <Typography variant="p" color="text.secondary" component="div">Where: {singleHobby.placeOfActivity} </Typography>
                <Typography variant="p" color="text.secondary" component="div">Category: {singleHobby.typeOfActivity} </Typography>

                <Button component={Link} to="/hobbies/create">
                  Create
                </Button>

                <Button component={Link} to={`/hobbies/${singleHobby._id}/edit`}>
                  Edit
                </Button>

                <Button onClick={this.handleDelete}>Delete</Button>
              </CardContent>
            </Box>
        )}
        </Card>
            <AddPostForm id={id} service={hobbyService} />
      </Container>
    );
  }
}

export default HobbyDetails;
