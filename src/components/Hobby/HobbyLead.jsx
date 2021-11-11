import React, { Component } from "react";
import { Link } from "react-router-dom";
import HobbiesPage from "./HobbiesPage";

class HobbyLead extends Component {
  // use styling to make two columns or cards from bootstrap - hobbies bunf and link on one side, random/featured hobby on the other

  render() {
    return (
      <div>
        <div>
          <h2>Hobbies</h2>
          <p>
            This is the place where you can search for your favourite hobby and
            either find others who are into it, or see what hobbies people are
            doing in your area.
          </p>
        </div>
        <div>
          <Link to="/hobbies" component={HobbiesPage} />
        </div>
        <div>
          <h2>Placeholder Featured Hobby</h2>
          <h3>CHEESE ROLLING</h3>
          <img src="../../../public/cheese-rolling.jpeg" alt="" />
          <p>
            People chase a wheel of Double Gloucester down a very steep hill in
            Gloucestershire. The cheese has a one-second head start, and the
            first one down wins the cheese
          </p>
        </div>
      </div>
    );
  }
}

export default HobbyLead;
