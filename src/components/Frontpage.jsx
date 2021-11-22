import React, { Component } from "react";
import { Link } from "react-router-dom";
import hobbiespic from "../images/hobbies.png";
import { Paper } from "@material-ui/core";
import { Button } from "@material-ui/core";

const styles = {
  paperContainer: {
      backgroundImage: `url(${hobbiespic})`,
      height: "500px"
  }
};

class Frontpage extends Component {

  render() {
    return (
      <div height="500px">
        <Paper maxWidth="sm" style={styles.paperContainer}>
          <h1>
            Find people to share your hobbies with, or even find a new one.
          </h1>
          <Link to="/signup">
            <Button variant="contained">Join Today</Button>
          </Link>
        </Paper>
      </div>
    );
  }
}

export default Frontpage;
