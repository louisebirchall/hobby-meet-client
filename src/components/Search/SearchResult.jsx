import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ result, category }) => {
  return (
    <>
      <h4>
        <Link to={`/${category}/${result._id}`}>
          {result.title || result.name || result.username}
        </Link>        
      </h4>
      <p>{result.description}</p>
    </>
  );
};

export default SearchResult;
