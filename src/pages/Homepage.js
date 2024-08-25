import React, { useState, useEffect } from "react";
// import Search and Picture components
import Search from "../components/Search";
import Picture from "../components/Picture";
import axios from "axios";

const Homepage = () => {
  // States:
  // data - the data fetched from Pexel,
  //        state changes when first time rendering and "Search" or "More Picture" button is clicked.
  // input - the string users type in the search bar, state changes whenever user type or delete a word.
  // page - the number put in the URL when "More Pictures" is clicked, state plus 1 whenever clicked,
  //        this is used to fetch different pages of the current search.
  // currentSearch - the string of the current input string at the time users click the "Search" button,
  //                 state only changes when the button is clicked.
  //                 If we use input as the variable putting in newURL, no matter the user clicks
  //                 "Search" button or not, as long as he/she types something in the search bar,
  //                 when the user clicks "More Picture" button, the new pictures fetch would related to
  //                 what the user typed.
  let [data, setData] = useState(null);
  let [input, setInput] = useState("");
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");

  // API key
  const auth = "AsDftEutFhJssapQBLvTDAEs3C4klKBlrpCG3SpWZw1znOaWGhvXFQmU";
  // The pictures recommended by Pexel
  const initialURL = `https://api.pexels.com/v1/curated?page=1&per_page=15`;
  // The pictures related to the given input
  let searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;

  // search is a function to send GET request to the given URL with API Key
  // This is what happens when we click the search button
  const search = async (url) => {
    try {
      // axios.get returns a Promise
      let result = await axios.get(url, {
        headers: { Authorization: auth },
      });
      // Update data with the photos string.
      setData(result.data.photos);
      // Update currentSearch state to input.
      setCurrentSearch(input);
    } catch (e) {
      console.log(e);
    }
  };

  // Because of Closure, although state is changed when first click,
  // the page value inside this function wouldn't be changed.
  // Deal with this by adding 1 manually in newURL.
  const morePicture = async () => {
    // According to the search input, decides what pictures we want to fetch
    let newURL = "";
    setPage(page + 1); // change Page state

    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${
        page + 1
      }`;
    }

    // axios.get returns a Promise
    try {
      let result = await axios.get(newURL, {
        headers: { Authorization: auth },
      });
      // concat new array of photos at the end of current photos array
      setData(data.concat(result.data.photos));
    } catch (e) {
      console.log(e);
    }
  };

  // When first time render the homepage, search for initialURL.
  useEffect(() => {
    search(initialURL);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          search(searchURL);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {/* data = null initially, which is falsy value, so nothing show up initially */}
        {/* If data is not null, render every pictures in data array */}
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>

      <div className="morePicture">
        {/* When click More Picture Button, call morePicture function */}
        <button onClick={morePicture}>More Pictures</button>
      </div>
    </div>
  );
};

export default Homepage;
