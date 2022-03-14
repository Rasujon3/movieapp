import "./App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/MovieList.jsx";
import MovieListHeading from "./components/MovieListHeading.jsx";
import SearchBox from "./components/SearchBox.jsx";
import AddFavourites from "./components/AddFavourites.jsx";
import RemoveFavourites from "./components/RemoveFavourites";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=1340ef34`;
    // http://www.omdbapi.com/?s=star wars&apikey=1340ef34
    const responce = await fetch(url);
    const responceJson = await responce.json();

    if (responceJson.Search) {
      setMovies(responceJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const AddFavouriteMovie = (movie) => {
    const newFavoutieList = [...favourites, movie];
    setFavourites(newFavoutieList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavoutieList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavouritesClick={AddFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
}

export default App;
