import React, { useState } from "react";

import "./App.css";
import "./SearchBar.css";

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const onFormSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(searchTerm);
  };
  return (
    <div id="searchbar">
      <form onSubmit={onFormSubmit} className="ui form">
        <div className="field">
          <div>
            <label htmlFor="">Image Search</label>
          </div>

          <input
            className="field"
            type="text"
            placeholder="Enter a term to search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
