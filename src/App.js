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
import UserLogged from "./components/UserLogged";

function App() {
  const [movieIds, setMovieIds] = useState([]);
  useEffect(() => {
    // console.log(movieIds);
  }, [movieIds]);

  const updatelist = (list) => {
    setMovieIds([]);
    setMovieIds(list);
  };
  return (
    <Router>
      <UserLogged />
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
                  movieIds.map((id) => <MovieCard movieId={id} />)}
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
