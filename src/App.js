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

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=2db75176`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if  (responseJson.Search) 
    {
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
    
    if (!favourites.includes(movie) && favourites.length <= 4){
      const newFavouriteList =  [...favourites, movie];
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    }
    else{
      alert("Only 5 nominations allowed");
    }
   
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite)=>favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };
  
  return (
    <div className ='container-fluid shoppies'>

      <div className = 'row d-flex align-items0center mt-4 mb-4'>
        <MovieListHeading heading = 'The Shoppies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className = 'row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading = 'Movies' />
      </div>
      <div className = 'row'>
        <MovieList 
          movies = {movies}  
          favouriteComponent={AddToFavorites} 
          handleFavouriteClick={addFavouriteMovie}
          />
      </div>
      <div className = 'row d-flex align-items0center mt-4 mb-4'>
        <MovieListHeading heading='Top Five Nominees' />
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