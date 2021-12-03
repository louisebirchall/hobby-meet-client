import React from "react";

function Contact() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Contact us here</h1>
      <h3>Carolina A Garcia:</h3>
      <h4>
        <a
          href="https://www.linkedin.com/in/carolina-alonso-garcia/"
          target="_blank"
          rel="noreferrer"
        >
          Contact Carolina Here
        </a>
      </h4>
      <h3>Florian Becker:</h3>
      <h4>
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noreferrer"
        >
          Contact Florian Here
        </a>
        {/* https://www.linkedin.com/in/florian-b-0b4609124/ */}
      </h4>
      <h3>Louise Birchall:</h3>
      <h4>
        <a
          href="https://www.linkedin.com/in/louise-birchall/"
          target="_blank"
          rel="noreferrer"
        >
          Contact Louise Here
        </a>
      </h4>
      <br />
    </div>
  );
}

export default Contact;
