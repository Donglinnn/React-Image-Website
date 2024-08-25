import React from "react";

// Search bar
const Search = ({ search, setInput }) => {
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="type here..."
        className="input"
        onChange={inputHandler}
      />
      {/* When the button is clicked, activate the search method in Homepage.js */}
      <button onClick={search}>Search</button>
    </div>
  );
};

export default Search;
