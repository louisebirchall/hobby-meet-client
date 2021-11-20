import React, { Component } from "react";
import { Link } from "react-router-dom";
import ceramics from "../images/ceramics.jpeg";

class Frontpage extends Component {
  render() {
    return (
      <div>
        <h1>Find people to share your hobbies with, or even find a new one.</h1>
        <Link to="/signup">
          <button>Join Today</button>
        </Link>
      </div>
    );
  }
}

export default Frontpage;
