import React, { Component } from "react";
import { Link } from "react-router-dom";
import bookBitch from "../../images/bookBitch.png";
import { CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";

const styles = {
  divStyle: {
    display: "flex",
    flexDirection: "Row",
  },
};

class EventLead extends Component {

  render() {
    return (
      <div style={styles.divStyle}>
        <div>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="250"
              image={bookBitch}
              alt="book bitch"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Book Bitch
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This time we were reading the Davinci Code. We hated it, it was
                almost as bad as Twilight. We all got together and had a great
                time talking about how terrible the plot holes were. Sharon
                brought some lovely scones, too. I recommend this event to
                anyone with actual taste.
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Events
              </Typography>
              <Typography variant="body2">
                If you want to find other like-minded people to enjoy your
                hobbies with you can find then via events, or even set up your
                own! What are you waiting for?
              </Typography>
              <Link to="/events">See all the Events</Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default EventLead;

{/* <h2>Placeholder Event Review</h2>
          <h3>BOOK BITCH</h3>
          <img src={bookBitch} alt="bookBitch" />
          <p>
            This time we were reading the Davinci Code. We hated it, it was
            almost as bad as Twilight. We all got together and had a great time
            talking about how terrible the plot holes were. Sharon brought some
            lovely scones, too. I recommend this event to anyone with actual
            taste.
          </p>
        </div>
        <div>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Events
            </Typography>
            <Typography variant="body2">
              If you want to find other like-minded people to enjoy your hobbies
              with you can find then via events, or even set up your own! What
              are you waiting for?
            </Typography>
            <Link to="/events">See all the Events</Link>
          </CardContent> */}