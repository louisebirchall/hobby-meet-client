import React, { Component } from "react";
import generalService from "../../services/general-service";

export class SearchResults extends Component {
  state = {
    search: "",
    type: "",
  };

  // q=${this.state.search}&type=${this.state.type}

  componentDidMount() {
    const { search, type } = this.props.match.params;
    generalService
      .search(search, type)
      .then((result) => {
        this.setState({
          search: result.data.search,
          type: result.data.type,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h2>Search results</h2>
        <p>{this.state.search}</p>
        <p>{this.state.type}</p>
      </div>
    );
  }
}

export default SearchResults;
