import { CardContent } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import cheeseRolling from "../../images/cheeseRolling.jpeg";
import { Typography, Button } from "@material-ui/core";
import Card from "@mui/material/Card";
import { CardMedia } from "@material-ui/core";
import { Box } from "@mui/system";

const styles = {
  divStyle: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-evenly",
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: "center"
  },
  buttonStyle: {
    display: "flex",
    justifyContent: "center"
  },
};

const cardH = (
  <React.Fragment>
    <CardContent style={{ display: "flex", flexDirection: "column", alignContent: "space-around"}}>
      <Typography variant="h3" color="text.secondary" gutterBottom>
        Hobbies
      </Typography>
      <Typography variant="h5">
        This is the place where you can search for your favourite hobby and
        either find others who are into it, or see what hobbies people are doing
        in your area.
      </Typography>

      <Link style={styles.buttonStyle} exact to="/hobbies">
        <Button color="primary" variant="contained">
          See all the Hobbies
        </Button>
      </Link>
    </CardContent>
  </React.Fragment>
);

class HobbyLead extends Component {
  render() {
    return (
      <div style={styles.divStyle}>
        <Card
          sx={{ maxWidth: 550, boxShadow: "-12px 12px 64px 0 #F0FFF0" }}
          variant="outlined"
        >
          {cardH}
        </Card>
        <Card
          sx={{ maxWidth: 550, boxShadow: "-12px 12px 64px 0 #F0FFF0" }}
          variant="outlined"
        >
          <CardMedia
            component="img"
            height="250"
            image={cheeseRolling}
            alt="cheese rolling"
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Cheese Rolling
            </Typography>
            <Typography variant="h5">
              People chase a wheel of Double Gloucester down a very steep hill
              in Gloucestershire. The cheese has a one-second head start, and
              the first one down wins the cheese
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default HobbyLead;
