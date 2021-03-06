import React, { Component } from "react";
import { Link } from "react-router-dom";
import hobbyService from "../../services/hobby-service";
import AddPostForm from "../Posts/AddPostForm";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Container,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
} from "@material-ui/core";
import { PuffLoader } from "react-spinners";

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

  handleNewData = (data) => {
    this.setState({ singleHobby: data.hobby });
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
    const { user } = this.props;
  

    return (
      <Container style={{ paddingBottom: 60, display: "flex",
          flexDirection: "column",
          alignItems: "center" }}>
        <Card sx={{ display: "flex" }}>
          {isLoading && <PuffLoader size="100px" color="orchid" />}

          {!isLoading && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                {singleHobby.image && (
                  <CardMedia
                    component="img"
                    src={singleHobby.image}
                    alt={singleHobby.name}
                    style={{
                      width: 300,
                      marginBottom: 20,
                    }}
                  />
                )}
                <Box align="center">
                  <Typography component="div" variant="h3">
                    {singleHobby.name}
                  </Typography>
                  <Typography
                    variant="p"
                    color="text.secondary"
                    component="div"
                  >
                    Description: {singleHobby.description}
                  </Typography>
                  <Typography
                    variant="p"
                    color="text.secondary"
                    component="div"
                  >
                    Where: {singleHobby.placeOfActivity}
                  </Typography>
                  <Typography
                    variant="p"
                    color="text.secondary"
                    component="div"
                  >
                    Category: {singleHobby.typeOfActivity}
                  </Typography>
                </Box>
                {user && user.isAdmin && (
                  <Grid container spacing={3}>
                    {/* <Box align="center" style={{marginTop: 15, display: "flex", justifyContent: "center"}}> */}
                    <div
                      align="center"
                      style={{
                        marginTop: 10,
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <div
                        style={{
                          width: "50vw",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          color="primary"
                          variant="contained"
                          component={Link}
                          to={`/hobbies/${singleHobby._id}/edit`}
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
                      </div>
                    </div>
                    {/* </Box> */}
                  </Grid>
                )}
              </CardContent>
            </Box>
          )}
        </Card>
        <AddPostForm
          id={id}
          service={hobbyService}
          saveUpdatedData={this.handleNewData}
        />
        {singleHobby &&
          singleHobby.posts.map((post) =>
          <>
           {/*  <image src={post.image}/> */}
            <p>{post.description}</p>
           </>   
          )}
      </Container>
    );
  }
}

export default HobbyDetails;
