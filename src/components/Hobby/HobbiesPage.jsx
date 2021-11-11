import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class HobbiesPage extends Component {
  state = {
    listOfHobbies: null,
    isLoading: true,
  };

  componentDidMount() {
    console.log(process.env.REACT_APP_SERVER_API);
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/hobbies`)
      .then((response) => {
        this.setState({ listOfHobbies: response.data, isLoading: false });
      })
      .catch((err) => {
        this.props.history.push("/500");
      });
  }

  render() {
    const { listOfHobbies, isLoading } = this.state;

    return (
      <div>
        <h1>All The Hobbies</h1>

        {isLoading && <h1>...isLoading</h1>}

        {!isLoading &&
          listOfHobbies.map((eachHobby) => {
            return (
              <div key={eachHobby._id}>
                <Link to={`/todo/${eachHobby._id}`}>
                  {eachHobby.title}
                </Link>
              </div>
            );
          })}
      </div>
    );
  }
}

export default HobbiesPage;
