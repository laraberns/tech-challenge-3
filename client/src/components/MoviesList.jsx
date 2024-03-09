import { useRef } from "react";

const MoviesList = (props) => {
    const containerRef = useRef();

    const MovieWatchComponent = props.watchedComponent;

    return (
        <div className="container">
            <div
                ref={containerRef}
                style={{
                    overflowX: "scroll",
                    scrollBehavior: "smooth"
                }}
            >
                <div className="content-box">
                    {props.movies.map((movie, index) => (
                        <div className="image-container mx-1" key={index} >
                            <img src={movie.Poster} alt="Movie Poster" />
                            <div
                                className="overlay d-flex flex-column align-items-center justify-content-center"
                                onClick={() => props.handleFavouritesClick(movie)}
                            >
                                <span className="titulo-filme-card">{movie.Title}</span>
                                <MovieWatchComponent />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MoviesList;
