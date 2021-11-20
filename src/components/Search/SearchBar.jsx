import React, { Component } from "react";
import generalService from "../../services/general-service";

// need to import a textfield for the final searchbar

// creating a searchbar that will be placed into the navbar
// when clicking on the magnifying glass the searchbar will appear with search submit button

// to hide the searchbar (initial)state needs to be false
// to show the hidden form: needed: onClick to handleToggle
// testing the appearence of the searchBar first with a btn later to be replaced with an icon

class SearchBar extends Component {
  state = {
    search: "",
    type: "all",
    showSearchBar: false,
  };

  // handleToggle = () => {
  //     this.setState({ showSearchBar: !this.state.showSearchBar })
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    generalService.search(this.state.search, this.state.type)
    .then((result) => {
        console.log(result)
    }).catch((err) => {
        
    });
  };

  handleChange = ({ target: { name, value } }) => {
    //this.props.handleFilter(value)
    this.setState({ [name]: value });
  };

  render() {
    const { search } = this.state;

    return (
      <div>
        {/* <button onClick={ this.handleToggle }> {this.state.showSearchBar ? "Search" : "Hide Search"} </button> */}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            name="search"
            value={search}
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
