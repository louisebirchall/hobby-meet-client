import React from 'react'
import { Link } from 'react-router-dom'

function Contact() {
    return (
      <div>
        <h2>Contact us here</h2>
        <br />
        <h4>Carolina A Garcia:</h4>
        <h5>
          <Link to="https://www.linkedin.com/in/carolina-alonso-garcia/">
            Contact Carolina Here
          </Link>
        </h5>
        <br />
        <h4>Florian Becker:</h4>
        <h5>
          <Link to="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            Contact Florian Here
          </Link>
        </h5>
        <h4>Louise Birchall:</h4>
        <h5>
          <Link to="https://www.linkedin.com/in/louise-birchall/">
            Contact Louise Here
          </Link>
        </h5>
      </div>
    );
}

export default Contact

