import React, { Component } from "react";
import { Link } from "react-router-dom";
// import bookBitch from "../../images/bookBitch.png";
import { CardContent } from "@material-ui/core";
import { Typography, Button } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import { Box } from "@mui/system";
import eventService from "../../services/event-service";

const styles = {
  divStyle: {
    display: "flex",
    flexDirection: "Row",
    gap: 20,
    justifyContent: "space-evenly",
    paddingTop: 20,
    paddingBottom: 60,
    textAlign: "center"
  },
  buttonStyle: {
    display: "flex",
    justifyContent: "center",
  },
};

class EventLead extends Component {
  state = {
    image: "",
    title: "",
    description: ""
  };

  // componentDidMount() {
  //   const { id } = this.props.match.params;
  //   if (id) {
  //     eventService
  //       .random(id)
  //       .then((result) => {
  //         this.setState({
  //           image: result.data.image,
  //           title: result.data.title,
  //           description: result.data.description,
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }

  render() {
    const { image, title, description } = this.state;
    return (
      <div style={styles.divStyle}>
        <div>
          <Card
            sx={{ maxWidth: 550, boxShadow: "-12px 12px 64px 0 #F0FFF0" }}
            variant="outlined"
          >
            <CardMedia
              component="img"
              height="250"
              image={image}
              alt={title}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {title}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </Card>
        </div>

        <Card
          sx={{ maxWidth: 550, boxShadow: "-12px 12px 64px 0 #F0FFF0" }}
          variant="outlined"
        >
          <CardContent>
            <Typography variant="h3" gutterBottom>
              Events
            </Typography>
            <Typography variant="h5">
              If you want to find other like-minded people to enjoy your hobbies
              with you can find then via events, or even set up your own! What
              are you waiting for?
            </Typography>
            <Box sx={{ height: 10 }} />
            <Link style={styles.buttonStyle} exact to="/events">
              <Button color="primary" variant="contained">
                See all the Events
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default EventLead;
