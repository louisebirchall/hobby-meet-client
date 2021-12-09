import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CardContent } from "@material-ui/core";
import { Typography, Button } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import { Box } from "@mui/system";
import eventService from "../../services/event-service";

const styles = {
  divStyle: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-evenly",
    paddingTop: 20,
    paddingBottom: 60,
    textAlign: "center",
  },
  buttonStyle: {
    display: "flex",
    justifyContent: "center",
  },
};

const cardE = (
  <React.Fragment>
    <CardContent
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "space-around",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Events
      </Typography>
      <Typography variant="h5">
        If you want to find other like-minded people to enjoy your hobbies with
        you can find then via events, or even set up your own! What are you
        waiting for?
      </Typography>
      <Box sx={{ height: 10 }} />
      <Link style={styles.buttonStyle} exact to="/events">
        <Button color="primary" variant="contained">
          See all the Events
        </Button>
      </Link>
    </CardContent>
  </React.Fragment>
);

class EventLead extends Component {
  state = {
    event: null,
  };

  componentDidMount() {
    eventService
      .getRandom(1)
      .then((result) => {
        console.log(result);
        this.setState({
          event: result.data[0],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { event } = this.state;
    return (
      <div style={styles.divStyle}>
        {event && (
          <Card
            sx={{ maxWidth: 550, boxShadow: "-12px 12px 64px 0 #F0FFF0" }}
            variant="outlined"
          >
            <CardMedia
              component="img"
              height="250"
              image={event.image}
              alt={event.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {event.title}
              </Typography>
              <Typography variant="h5">{event.description}</Typography>
            </CardContent>
          </Card>
        )}
        <Card
          sx={{ boxShadow: "-12px 12px 64px 0 #F0FFF0" }}
          variant="outlined"
          style={{ maxWidth: 550 }}
        >
          {cardE}
        </Card>
      </div>
    );
  }
}

export default EventLead;
