import React, { Component } from "react";
import { Link } from "react-router-dom";
import bookBitch from "../../images/bookBitch.png";

class EventLead extends Component {
  // use styling to make two columns or cards from bootstrap - hobbies bunf and link on one side, random/featured hobby on the other

  render() {
    return (
      <div>
        <div>
          <h2>Placeholder Event Review</h2>
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
          <h2>Events</h2>
          <p>
            If you want to find other like-minded people to enjoy your hobbies
            with you can find then via events, or even set up your own! What are
            you waiting for?
          </p>
        </div>
        <div>
          <Link to="/events">See all the Events</Link>
        </div>
      </div>
    );
  }
}

export default EventLead;
