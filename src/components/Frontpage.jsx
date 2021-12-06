import React, { Component } from "react";
import { Link } from "react-router-dom";
import hobbiespic from "../images/hobbies.png";
import h3 from "../images/hobbies3.jpeg"
import h4 from "../images/hobbies4.jpeg"
import h5 from "../images/hobbies5.jpeg"
import { Paper } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Box } from "@mui/system";

const styles = {
  paperContainer: {
    backgroundImage: `url(${h3})`,
    height: "500px",
  },
  // why isn't this working?
  h1Styles: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    marginLeft: 50,
    marginRight: 50,
    textShadowColor: "#3aefd5",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
};

class Frontpage extends Component {
  render() {
    return (
      <div height="500px">
        <Paper maxWidth="sm" style={styles.paperContainer}>
          <Box
            sx={{
              height: 400,
              paddingTop: 5,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={styles.h1Styles}>
              <span style={{
                borderRadius: "4px",
                padding: "6px 16px 6px 16px"                
                }}>
                Find people to share your hobbies with, or even find a new one,
                while contributing to a good cause!
              </span>
            </h1>
            <Link to="/signup">
              <Button color="primary" variant="contained">
                Join Today
              </Button>
            </Link>
          </Box>
        </Paper>
      </div>
    );
  }
}

export default Frontpage;
