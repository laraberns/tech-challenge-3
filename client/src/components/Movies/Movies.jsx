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
    }, [search, userId]);


    const addFavouriteMovie = async (movie) => {
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
    
    const RemoveFavouriteMovie = (movie) => {
        const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
        setFavourites(newFavouriteList);
    
        // Modifique o corpo da requisição para incluir foto e nome do filme
        fetch('http://localhost:1999/watchedMovies/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                movie_id: movie.imdbID,
                Title: movie.Title,
                Poster: movie.Poster,
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
