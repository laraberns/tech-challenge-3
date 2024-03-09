const MoviesList = (props) => {
    const MovieWatchComponent = props.watchedComponent;

    return (
        <div className="d-flex justify-content-start m-3">
            {props.movies.map((movie, index) => (
                <div className="image-container" key={index}>
                    <img src={movie.Poster} alt="Movie Poster" />

                    <div
                        className="overlay d-flex align-items-center justify-content-center"
                        onClick={() => props.handleFavouritesClick(movie)}
                    >
                        <MovieWatchComponent />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MoviesList;
