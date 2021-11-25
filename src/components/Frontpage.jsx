import React, { Component } from "react";
import { Link } from "react-router-dom";
import hobbiespic from "../images/hobbies.png";
import { Paper } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Box } from "@mui/system";

const styles = {
  paperContainer: {
      backgroundImage: `url(${hobbiespic})`,
      height: "500px"
  },
  // why isn't this working?
  contentStyles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'space-evenly'
  }
};

class Frontpage extends Component {

  render() {
    return (
      <div height="500px" >
        <Paper maxWidth="sm" style={styles.paperContainer}>
        <Box sx={{height:400, paddingTop:5, display: 'flex', flexDirection:"column", gap:10, justifyContent:"center", alignItems:"center", textAlign:"center"}}>
          <h1>
            Find people to share your hobbies with, or even find a new one, while you are contributing to a good charity cause!
          </h1>
        
            <Button href="/signup" variant="contained">Join Today</Button>
  
          </Box>
        </Paper>
      </div>
    );
  }
}

export default Frontpage;
