import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const MovieCard = ({
  movieId,
  loggedInUserId,
  userFavList,
  user,
  updateUser,
}) => {
  const [movieInfo, setMovieInfo] = useState(null);
  const favButton = useRef(null);

  useEffect(() => {
    fetchInfo();
    console.log(user);
  }, []);

  const fetchInfo = async () => {
    const res = await axios.get(
      `http://www.omdbapi.com/?i=${movieId}&apikey=96b29eca`
    );
    setMovieInfo(res.data);
  };

  const like = async () => {
    if (!user) return;
    let check = userFavList.findIndex((fav) => fav == movieInfo.imdbID);
    if (check == -1) {
      user.favorite.push(movieInfo.imdbID);
      updateUser(user);
      await axios.put(`http://localhost:5000/users/${loggedInUserId}`, user);
      favButton.current.classList.add("favButton");
    } else {
      user.favorite.splice(check, 1);
      updateUser(user);
      await axios.put(`http://localhost:5000/users/${loggedInUserId}`, user);
      favButton.current.classList.remove("favButton");
    }
  };

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
              ref={favButton}
              className={`btn ${loggedInUserId ? null : "hide"} ${
                loggedInUserId && userFavList.indexOf(movieInfo.imdbID) !== -1
                  ? "favButton"
                  : null
              }`}
              id={movieInfo.imdbID}
              type="submit"
              onClick={like}
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
