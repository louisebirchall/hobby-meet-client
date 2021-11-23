import { CardContent } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import cheeseRolling from "../../images/cheeseRolling.jpeg";
import { Typography } from "@material-ui/core";
import Card from "@mui/material/Card";
import { CardMedia } from "@material-ui/core";

const cardL = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Hobbies
      </Typography>
      <Typography variant="body2">
        This is the place where you can search for your favourite hobby and
        either find others who are into it, or see what hobbies people are doing
        in your area.
      </Typography>
      <Link to="/hobbies">See all the Hobbies</Link>
    </CardContent>
  </React.Fragment>
);

const styles = {
  divStyle: {
    display: "flex",
    flexDirection: "Row",
    gap: 20,
    justifyContent: "space-evenly",
    paddingTop: 20,
    paddingBottom: 20
  }
}


class HobbyLead extends Component {

  render() {
    return (
      <div style={styles.divStyle}>
     
        <Card
          sx={{ maxWidth: 400, boxShadow: "-12px 12px 64px 0 #F0FFF0" }}
          variant="outlined"
        >
          {cardL}
        </Card>
        <Card
          sx={{ maxWidth: 400, boxShadow: "-12px 12px 64px 0 #F0FFF0" }}
          variant="outlined"
        >
          <CardMedia
            component="img"
            height="250"
            image={cheeseRolling}
            alt="cheese rolling"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Cheese Rolling
            </Typography>
            <Typography variant="body2" color="text.secondary">
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

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// export default function MediaCard() {
//   return (
// <Card sx={{ maxWidth: 345 }}>
//   <CardMedia
//     component="img"
//     height="140"
//     image="/static/images/cards/contemplative-reptile.jpg"
//     alt="green iguana"
//   />
//   <CardContent>
//     <Typography gutterBottom variant="h5" component="div">
//       Lizard
//     </Typography>
//     <Typography variant="body2" color="text.secondary">
//       Lizards are a widespread group of squamate reptiles, with over 6,000
//       species, ranging across all continents except Antarctica
//     </Typography>
//   </CardContent>
//   <CardActions>
//     <Button size="small">Share</Button>
//     <Button size="small">Learn More</Button>
//   </CardActions>
// </Card>
//   );
// }

// export default function OutlinedCard() {
//   return (
//     <Box sx={{ minWidth: 275 }}>
//       <Card variant="outlined">{card}</Card>
//     </Box>
//   );
// }

// -- prev one

//   render() {
//     return (
//       <div>
//         <div>
//           <h2>Hobbies</h2>
//           <p>
//             This is the place where you can search for your favourite hobby and
//             either find others who are into it, or see what hobbies people are
//             doing in your area.
//           </p>
//         </div>
//         <div>
//           <Link to="/hobbies">See all the Hobbies</Link>
//         </div>
//         <div>
//           <h2>Placeholder Featured Hobby</h2>
//           <h3>CHEESE ROLLING</h3>
//           <img src={cheeseRolling} alt="cheeseRolling" />
//           <p>
//             People chase a wheel of Double Gloucester down a very steep hill in
//             Gloucestershire. The cheese has a one-second head start, and the
//             first one down wins the cheese
//           </p>
//         </div>
//       </div>
//     );
//   }
// }
