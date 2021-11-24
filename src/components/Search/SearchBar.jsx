import React, { Component } from "react";
import generalService from "../../services/general-service";

class SearchBar extends Component {
  state = {
    search: "",
    type: "all",
    showSearchBar: false,
  };


  handleSubmit = (event) => {
    event.preventDefault();
    generalService.search(this.state.search, this.state.type)
    .then((result) => {
        console.log(result)
    }).catch((err) => {
        
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { search } = this.state;

    return (
      <div>
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
