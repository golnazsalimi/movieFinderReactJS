import { useState } from "react";
import axios from "axios";

const SearchMovie = ({ updateList }) => {
  const [text, setText] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please write name of desired movie");
      return;
    }

    const response = await axios.get(
      `http://www.omdbapi.com/?s=${text}&apikey=96b29eca`
    );
    updateList(response.data.Search.map((item) => item.imdbID));

    setText("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="form-control me-2"
        id="filmTitleSearch"
        aria-label="Search"
        name="filmTitleSearch"
        placeholder="Search By Name of Desired Movie"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="btn btn-secondary"
        type="submit"
        value="Search"
        id="search"
      >
        Search
      </button>
    </form>
  );
};

export default SearchMovie;
