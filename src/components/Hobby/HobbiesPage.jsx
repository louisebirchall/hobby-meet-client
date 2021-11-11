import React, { Component } from "react";
import { Link } from "react-router-dom";
import hobbyService from "../../services/hobby-service";

class HobbiesPage extends Component {
  state = {
    listOfHobbies: null,
    isLoading: true,
  };

  componentDidMount() {
    console.log(process.env.REACT_APP_SERVER_API);
    hobbyService.getHobbies()
      .then((response) => {
        this.setState({ listOfHobbies: response.data, isLoading: false });
      })
      .catch((err) => {
        // this.props.history.push("/500");
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
                <Link to={`/hobbies/${eachHobby._id}`}>
                  {eachHobby.name}
                </Link>
              </div>
            );
          })}
      </div>
    );
  }
}

export default HobbiesPage;
