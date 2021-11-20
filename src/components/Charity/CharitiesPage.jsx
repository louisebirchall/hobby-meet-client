import React, { Component } from "react";
import { Link } from "react-router-dom";
import charityService from "../../services/charity-service";
//import SearchBar from "../Search/SearchBar";

class CharitiesPage extends Component {
  state = {
    listOfCharities: null,
    isLoading: true,
   // showSearchBar: false,
  };

  // handleToggle = () => {
  //   this.setState({ showSearchBar: !this.state.showSearchBar });
  // };

  componentDidMount() {
    // console.log(process.env.REACT_APP_SERVER_API);
    charityService
      .getCharities()
      .then((response) => {
        this.setState({ listOfCharities: response.data, isLoading: false });
      })
      .catch((err) => {
        // this.props.history.push("/500");
      });
  }

  render() {
    const { listOfCharities, isLoading } = this.state;

    return (
      <div>
        <h1>All The Charities</h1>

        {isLoading && <h1>...isLoading</h1>}

        {/* <button 
        onClick={this.handleToggle}>
        {this.state.showSearchBar ? "Hide Search" : "Search"}
        </button>

        {this.state.showSearchBar && <SearchBar />} */}
       
        {!isLoading &&
          listOfCharities.map((eachCharity) => {
            return (
              <div key={eachCharity._id}>
                <Link to={`/charities/${eachCharity._id}`}>
                  {eachCharity.name}
                </Link>

              </div>
            );
          })}
      </div>
    );
  }
}

export default CharitiesPage;
