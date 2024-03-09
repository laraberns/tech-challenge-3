import { useEffect, useState } from "react";
import MoviesList from "./MoviesList";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Movies.css';
import MovieListHeading from "./MovieListHeading";
import SearchBox from "./SearchBox";
import AddWatched from "./AddWatched";
import RemoveWatched from "./RemoveWatched";

const Movies = () => {

    const userId = localStorage.getItem('user_id');

    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [favourites, setFavourites] = useState([]);

    const getMovieRequests = async () => {
        const url = 'http://localhost:1999/movies/getAll';

        const response = await fetch(url);
        const responseJson = await response.json();

        if (search !== '') {
            // Filter movies based on the search term
            const filteredMovies = responseJson.filter((movie) =>
                movie.Title.toLowerCase().includes(search.toLowerCase())
            );
            setMovies(filteredMovies);
        } else {
            setMovies(responseJson);
        }
    }

    // Adicione uma nova função para obter filmes assistidos
    const getFavouriteMovies = async () => {
        if (!userId) {
            return;
        }

        const url = `http://localhost:1999/watchedMovies/getByUserId/${userId}`;
        const response = await fetch(url);
        const responseJson = await response.json();

        setFavourites(responseJson);
    };

    useEffect(() => {
        getMovieRequests();
        getFavouriteMovies();
    }, [search]);


    const addFavouriteMovie = async (movie) => {
        // Check if the movie is already in the favourites list
        const isAlreadyAdded = favourites.some((favourite) => favourite.imdbID === movie.imdbID);
    
        if (isAlreadyAdded) {
            console.warn('This movie is already in your watched list.');
            return;
        }
    
        const newFavouriteList = [...favourites, movie];
        setFavourites(newFavouriteList);
    
        // Modifique o corpo da requisição para incluir foto e nome do filme
        await fetch('http://localhost:1999/watchedMovies/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: String(userId),
                movie_id: movie.imdbID,
                Title: movie.Title,
                Poster: movie.Poster,
            }),
        });
    };
    

    const RemoveFavouriteMovie = async (movie) => {
        const newFavouriteList = favourites.filter((favourite) => favourite.movie_id !== movie.movie_id);
        setFavourites(newFavouriteList)

        await fetch('http://localhost:1999/watchedMovies/remove', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: String(userId),
                movie_id: movie.movie_id,
            }),
        });
    };


    return (
        <div className="container-fluid movie-app">
            <div className="row d-flex align-items-center mt-4 mb-3">
                <MovieListHeading heading="Filmes" />
                <SearchBox
                    search={search}
                    setSearch={setSearch}
                />
            </div>
            <div className="row">
                <MoviesList
                    movies={movies}
                    watchedComponent={AddWatched}
                    handleFavouritesClick={addFavouriteMovie}
                />
            </div>
            <div className="row d-flex align-items-center mt-4 mb-3">
                {favourites.length > 0 && (
                    <>
                        <div className="row d-flex align-items-center mt-4 mb-3">
                            <MovieListHeading heading="Assistidos" />
                        </div>
                        <div className="row">
                            <MoviesList
                                movies={favourites}
                                watchedComponent={RemoveWatched}
                                handleFavouritesClick={RemoveFavouriteMovie}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Movies;
