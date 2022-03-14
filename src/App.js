import "./App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/MovieList.jsx";
import MovieListHeading from "./components/MovieListHeading.jsx";
import SearchBox from "./components/SearchBox.jsx";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;
