import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const Favorite = ({ onAdd }) => {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    const getFav = async () => {
      const favFromServer = await fetchFavs();
      setFavorite(favFromServer);
    };
    getFav();
  }, []);

  const fetchFavs = async () => {
    const res = await axios.get("http://localhost:5000/users");
    const data = await res.favorite.json();

    return data;
  };

  const addFav = async (fav) => {
    const res = await axios.post("http://localhost:5000/users", {
      favorite: JSON.stringify(fav),
    });

    const data = await res.json();
    setFavorite([...favorite, data]);
  };

  //   const deleteFav = async (id) => {
  //     await fetch(`http://localhost:5000/tasks/${id}`, {
  //       method: "DELETE",
  //     });

  //     setFavorite(tasks.filter((task) => task.id !== id));
  //   };

  return <div></div>;
};

export default Favorite;
