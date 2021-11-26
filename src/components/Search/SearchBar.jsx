import React, { Component } from "react";
import generalService from "../../services/general-service";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Redirect } from "react-router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

class SearchBar extends Component {
  state = {
    search: "",
    type: "all",
    showSearchBar: false,
    redirect: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ redirect: true });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { search, redirect } = this.state;

    return redirect ? (
      <Redirect
        to={{
          pathname: "/search",
          search: `?q=${this.state.search}&type=${this.state.type}`,
        }}
      />
    ) : (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Search onChange={this.handleChange}>
            {/* 
            <input
              type="text"
              placeholder="Search..."
              name="search"
              value={search}
              onChange={this.handleChange}
            />
             <button type="submit">Search</button> 
          </form> */}
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              name="search"
            />
          </Search>
        </form>
      </div>
    );
  }
}

export default SearchBar;
