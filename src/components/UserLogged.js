import Login from "./Login";
import { useState, useEffect } from "react";
import axios from "axios";

const UserLogged = ({ users }) => {
  const [showUserLogged, setShowUserLogged] = useState(false);

  const isUserLogged = () => {
    const loggedInUserId = JSON.parse(localStorage.getItem("user"));
    setShowUserLogged(true);
  };
  isUserLogged();

  return (
    <div className="navbar fixed-top navbar-light bg-light">
      <div
        className="container-fluid"
        onLogin={() => setShowUserLogged(showUserLogged)}
        showAdd={showAddUser}
      >
        Wellcome {users.clientName}
      </div>
    </div>
  );
};

export default UserLogged;
