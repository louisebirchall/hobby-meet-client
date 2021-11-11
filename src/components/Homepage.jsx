import React, { Component } from "react";
import HobbyLead from "./Hobby/HobbyLead";
import EventLead from "./Event/EventLead";
import Frontpage from "./Frontpage";

// we need to import
// Hobby Component -  Intro text (information), Btn (redirect to hobby list)
// Random hobby -> Math.Random for hobby.model? / shuffle?

/*
Array of hobbies 
every hobby has an individual id 
we want to display the image of the specific hobby by random

=> Math.Random 
=> comp
*/

// Event Component -> Display last event depending on Event.Model
// Event Carousel for Random Events (Math.Random)
// Reviews Carousel for previous events

// User Component -> Random profiles appearing (Math.Random)

// "Banner" for Sign up including Btn (redirect to "Sign up Form")

class Homepage extends Component {
  render() {
    return (
      <div>
        <Frontpage />
        <HobbyLead />
        <EventLead />
      </div>
    );
  }
}

export default Homepage;
