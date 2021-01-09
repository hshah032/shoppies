import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddToFavorites from './components/AddToFavorites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  
  //   {
  //   "Title": "Star Wars: Episode IV - A New Hope",
  //           "Year": "1977",
  //           "imdbID": "tt0076759",
  //           "Type": "movie",
  //           "Poster": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
  //       },
  //       {
  //           "Title": "Star Wars: Episode V - The Empire Strikes Back",
  //           "Year": "1980",
  //           "imdbID": "tt0080684",
  //           "Type": "movie",
  //           "Poster": "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
  //       },
  //       {
  //           "Title": "Star Wars: Episode VI - Return of the Jedi",
  //           "Year": "1983",
  //           "imdbID": "tt0086190",
  //           "Type": "movie",
  //           "Poster": "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
  //       }

  // ]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=2db75176`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if  (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(()=>{
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(()=>{
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );

    setFavourites(movieFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  };


  const addFavouriteMovie = (movie) => {
    const newFavouriteList =  [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite)=>favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };
  
  return (
    <div className ='container-fluid shoppies'>
      <div className = 'row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading = 'Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        
      </div>
      <div className = 'row'>
        <MovieList 
          movies = {movies}  
          favouriteComponent={AddToFavorites} 
          handleFavouriteClick={addFavouriteMovie}
          />
      </div>
      <div className = 'row d-flex align-items0center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className = 'row'>
        <MovieList 
          movies={favourites} 
          handleFavouriteClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites} 

          
          />
      </div>
    </div>
  );
};

export default App;