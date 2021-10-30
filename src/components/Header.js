import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [isUserLogged, setIsUserLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsUserLogged(true);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Movie Finder
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                Favorites
              </Link>
            </li>
          </ul>
          <div className="navbar-nav">
            <Link
              className="btn btn-light"
              to="/logIn"
              id="logBtn"
              role="button"
              onClick={() => {
                if (isUserLogged) {
                  console.log("iiii");
                  localStorage.removeItem("user");
                  setIsUserLogged(false);
                }
              }}
            >
              {isUserLogged ? "Log out" : "Log in"}
            </Link>
          </div>
          {!isUserLogged && (
            <div className="navbar-nav">
              <Link className="btn btn-dark" to="/signUp" role="button">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
