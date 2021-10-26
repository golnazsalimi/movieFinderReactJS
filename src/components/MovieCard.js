import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import UserLogged from "./UserLogged";

const MovieCard = ({ movieId, loggedInUserId }) => {
  const [movieInfo, setMovieInfo] = useState(null);

  const fetchInfo = async () => {
    const res = await axios.get(
      `http://www.omdbapi.com/?i=${movieId}&apikey=96b29eca`
    );
    setMovieInfo(res.data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div>
      {movieInfo && (
        <div className="card searchItemsCard m-2" style={{ width: "18rem" }}>
          <header>
            <div>
              <img
                className="card-img-top movieImg"
                src={movieInfo.Poster}
                alt=""
              />
              <div className="cardRating">
                <span className="cardRatingFilled" id="imdbRating">
                  IMDB : {movieInfo.imdbRating}
                </span>
              </div>
            </div>
          </header>
          <div className="card-body">
            <h5 className="card-title" id={movieInfo.Title}>
              {movieInfo.Title} , {movieInfo.Year}
            </h5>
          </div>
          <div className="card-body">
            <span id="genre">{movieInfo.Genre}</span>
          </div>
          <div className="card-body">
            <button
              className={`btn ${loggedInUserId ? null : "hide"} ${
                loggedInUserId &&
                user.favorite.find((fav) => fav == movieInfo.imdbID)
                  ? "favButton"
                  : null
              }`}
              id={movieInfo.imdbID}
              type="submit"
            >
              &hearts;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
