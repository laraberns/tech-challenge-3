import { useEffect, useState } from "react";
import MoviesList from "./MoviesList";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Movies.css';
import MovieListHeading from "./MovieListHeading";
import SearchBox from "./SearchBox";

function Movies() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');

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
    };

    useEffect(() => {
        getMovieRequests();
    }, [search]);

    return (
        <div className="container-fluid movie-app">
            <div className="row d-flex align-items-center mt-4 mb-3">
                <MovieListHeading heading="Filmes" />
                <SearchBox
                    search={search} setSearch={setSearch}
                />
            </div>
            <div className="row">
                <MoviesList movies={movies} />
            </div>
        </div>
    );
}

export default Movies;
