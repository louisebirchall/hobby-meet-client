import React, { Component } from "react";
import generalService from "../../services/general-service";
import queryString from "query-string";
import { useScrollTrigger } from "@material-ui/core";
import SearchResult from "./SearchResult";

export class SearchResults extends Component {
  state = {
    listOfResults: null,
    search: "",
    type: "",
    isLoading: true,
  };

  // q=${this.state.search}&type=${this.state.type}

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);

    generalService
      .search(query.q, query.type)
      .then((result) => {
        this.setState({
          listOfResults: result.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { listOfResults, search, type, isLoading } = this.state;

    return (
      <>
        <h1>Search Results</h1>
        {isLoading && <div>loading</div>}
        {!isLoading && (
          <>
            {/* {Object.keys(listOfResults).map((eachItem) => {
            if (listOfResults[eachItem].length === 0) {
                return null;
              }
              return (
              <div>
                <p>{listOfResults[eachItem.name && eachItem.title]}</p>
              </div>
              )
          })} */}
            {Object.keys(listOfResults).map((category) => {
              if (listOfResults[category].length === 0) {
                return null;
              }
              return (
                <div>
                  <p>
                    <h2>
                      {category} <sup>{listOfResults[category].length}</sup>
                    </h2>
                  </p>
                  {listOfResults[category].map((result) => {
                    return <SearchResult result={result} category={category} />;
                  })}
                </div>
              );
            })}
          </>
        )}
      </>
    );
  }
}

export default SearchResults;
