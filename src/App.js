import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchMovie from "./components/SearchMovie";
import MovieCard from "./components/MovieCard";
import About from "./components/About";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Favorite from "./components/Favorite";
import axios from "axios";

function App() {
  const [movieIds, setMovieIds] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [userFavList, setUserFavList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // console.log(movieIds);
  }, [movieIds]);

  const updatelist = (list) => {
    setMovieIds([]);
    setMovieIds(list);
  };

  useEffect(async () => {
    if (localStorage.getItem("user")) {
      const userID = localStorage.getItem("user");
      await setLoggedInUserId(userID);
    }
  }, []);

  useEffect(async () => {
    if (loggedInUserId) {
      const userData = await axios.get(
        `http://localhost:5000/users/${loggedInUserId}`
      );
      console.log(userData.data.favorite);
      setUserFavList(userData.data.favorite);
      setUser(userData.data);
    }
  }, [loggedInUserId]);
  const updateUser = (user) => {
    setUser(user);
  };

  return (
    <Router>
      <Header />
      <Route
        path="/"
        exact
        render={(props) => (
          <>
            <div className="App">
              <SearchMovie updateList={updatelist} />
              <div className="resultSection">
                {movieIds.length > 0 &&
                  movieIds.map((id) => (
                    <MovieCard
                      movieId={id}
                      loggedInUserId={loggedInUserId}
                      userFavList={userFavList}
                      user={user}
                      updateUser={updateUser}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      />
      <Route path="/about" component={About} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
      <Route path="/favorite" component={Favorite} />
      <Footer />
    </Router>
  );
}

export default App;
