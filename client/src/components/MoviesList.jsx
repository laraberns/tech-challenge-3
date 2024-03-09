const MoviesList = (props) => {
    return (
        <div className="d-flex justify-content-start m-3">
            {props.movies.map((movie, index) => (
                <img key={index} src={movie.Poster} alt="Movie Poster" />
            ))}
        </div>
    );
};

export default MoviesList;
